({
    doInit: function(cmp, event, helper) {
        var langLocale = $A.get('$Locale.langLocale'),
            searchTerm = cmp.get('v.searchTerm');

        // local function has access to scoped variables
        function processSearchResponse(response) {
            response = JSON.parse(response);
            console.log(response);

            var filters = response.filters,
                taxonomyFilters = [],
                dateFilters = [],
                relevance = response.contentOrdering.Relevance;
            for (var i = 0; i < filters.length; i++) {
                if (filters[i].filterType === 'Taxonomy') {
                    taxonomyFilters.push(filters[i]);
                } else if (filters[i].filterType === 'OriginalPublishedDate') {
                    dateFilters = filters[i].children;
                }
            }

            cmp.set('v.taxonomyFilters', taxonomyFilters);
            cmp.set('v.dateFilters', dateFilters);
            cmp.set('v.contentOrdering', response.contentOrdering);

            var tempEl = document.createElement('div'),
                results,
                nTotalResults,
                msg;

            tempEl.innerHTML = $o.fixSitePrefix(response.renderings,
                response.hostSiteData.siteUrl,
                response.siteData.prefix,
                response.hostSiteData.prefix,
                cmp.get('v.SLDSPath')
            );

            // convert HTMLCollection to Array so we can do array things
            results = Array.prototype.slice.call(tempEl.children);
            nTotalResults = results.length;

            cmp.set('v.totalResultCount', nTotalResults);

            var resultsContainer = cmp.find('taxonomySearchResults').getElement();

            for (var i = 0; i < nTotalResults; i++) {
                var resultItem = results[i];
                resultItem.setAttribute('data-relevance', relevance.indexOf(resultItem.dataset.versionorigin)); // we seem to be too early to set this via result.dataset.relevance

                if (i >= cmp.get('v.numResults')) {
                    resultItem.className += ' hide';
                    cmp.set('v.isMore', true);
                } else {
                    var numResultsShowing = cmp.get('v.numResultsShowing');
                    cmp.set('v.numResultsShowing', numResultsShowing + 1);
                }

                var timeEl = resultItem.getElementsByClassName('timeSincePublished');
                if (timeEl.length === 1) {
                    var publishedDate = parseInt(resultItem.dataset.publisheddate); // expected as Unix timestamp
                    if (helper.isInteger(publishedDate)) {
                        timeEl[0].innerText = $o.shortDate(new Date(publishedDate));
                    }
                }
                resultsContainer.innerHTML += resultItem.outerHTML;
            }

            helper.addClickHandlers(resultsContainer);

            searchTerm = '<strong>' + searchTerm + '</strong>';

            // for each message pattern we supplant in the search term
            // for multiple search results we also insert the count
            if (nTotalResults === 0) {
                msg = $A.get('$Label.c.ec_Search_Summary_Message_0');
                msg = $o.supplant(msg, [searchTerm]);
                //msg = msg.supplant([searchTerm]);
            } else if (nTotalResults === 1) {
                msg = $A.get('$Label.c.ec_Search_Summary_Message_1');
                msg = $o.supplant(msg, [searchTerm]);
                //msg = msg.supplant([searchTerm]);
            } else {
                msg = $A.get('$Label.c.ec_Search_Summary_Message_Multiple');
                msg = $o.supplant(msg, [searchTerm, nTotalResults]);
                //msg = msg.supplant([searchTerm, nTotalResults]);
            }

            helper.orderFilter(cmp, event, helper);

            cmp.set('v.summaryMessage', msg);
            var spinner = cmp.find('loadingSpinner');
            $A.util.addClass(spinner, 'hidden');

        }   // processSearchResponse

        // --- begin doInit ---
        helper.callServer(cmp, 'c.search', processSearchResponse, {
            searchTerm: searchTerm,
            contentType: cmp.get('v.contentTypeToSearch'),
            order: cmp.get('v.resultsOrder'),
            contentTemplate: cmp.get('v.contentTemplateToRender'),
            langLocale: langLocale,
            allowDateFiltering: cmp.get('v.allowDateFiltering') + '',
            allowTagFiltering: cmp.get('v.allowTagFiltering') + '',
            categoriesVisible: cmp.get('v.categoriesVisible') + '',
            taxVisible: cmp.get('v.taxVisible') + '',
            isTargeted: !cmp.get('v.ignoreTargets')
        });
    },


    callServer: function (component, method, callback, params, cacheable) {
        var action = component.get(method);

        if (params) {
            action.setParams(params);
        }

        if (cacheable) {
            action.setStorable();
        }

        action.setCallback(this, function (response) {
            var state = response.getState();

            if (state === 'SUCCESS') {
                callback.call(this, response.getReturnValue());
            } else if (state === 'ERROR') {
                // generic error handler
                var errors = response.getError();

                if (errors) {
                    $A.log('Errors', errors);
                    if (errors[0] && errors[0].message) {
                        throw new Error('Error' + errors[0].message);
                    }
                } else {
                    console.error('unknown callback error');
                    throw new Error('Unknown Error');
                }
            }
        });

        $A.enqueueAction(action);
    },  // callServer


    isFiltering: function (cmp, event, helper) {
        var nothingSelected = true;

        var timeFilters = cmp.find('timeFilter');
        var tagFilters = cmp.find('tagFilter');

        // check if all filters are deselected
        if (timeFilters) {
            for (var i = 0; i < timeFilters.length; i++) {
                if (timeFilters[i].isValid() && timeFilters[i].get('v.value')) {
                    nothingSelected = false;
                    break;
                }
            }
        } else {
            console.error('timeFilters null');
        }

        if (tagFilters && !tagFilters.length) {
            tagFilters = [tagFilters];      // the code below assumes there’s an array
        }

        if (tagFilters) {
            for (var i = 0; i < tagFilters.length; i++) {
                if (tagFilters[i].isValid() && tagFilters[i].get('v.value')) {
                    nothingSelected = false;
                    break;
                }
            }
        } else {
            console.error('tagFilters null');
        }

        return !nothingSelected;
    },


    handleFiltering: function (cmp, event, helper, itemsToDisplay) {
        var isMore = false,
            numDisplayed = 0,
            isFiltering = this.isFiltering(cmp, event, helper),
            operator = cmp.get('v.filterOperator').toLowerCase(),
            markup = cmp.find('taxonomySearchResults').getElement(),
            newsItems = markup.children,
            order = cmp.find('orderFilter').get('v.value'),
            contentOrdering = cmp.get('v.contentOrdering'),
            filteredIds = [];

        cmp.set('v.isFiltering', isFiltering); // component has if statements controlling element visibility

        if (order === 'date') {
            filteredIds = contentOrdering.PublishedDate.slice().reverse();
        } else if (order === 'dateasc') {
            filteredIds = contentOrdering.PublishedDate.slice();
        } else {
            // assume relevance
            filteredIds = contentOrdering.Relevance.slice();
        }

        if (isFiltering && operator === 'and') {
            filteredIds = helper.handleTimeAndFiltering(cmp, filteredIds);
            if (filteredIds.length) {
                filteredIds = helper.handleTagAndFiltering(cmp, filteredIds);
            }
        } else if (isFiltering && operator === 'or') {
            var allIds = filteredIds;
            filteredIds = [];
            filteredIds = helper.handleTimeOrFiltering(cmp, filteredIds, allIds);
            filteredIds = helper.handleTagOrFiltering(cmp, filteredIds, allIds);
            filteredIds = $o.unique(filteredIds);
        }

        for (var i = 0; i < newsItems.length; i++) {
            // is the news item part of the filteredIds list, and have we shown fewer than our view limit?
            // for some reason latest id and origin id are returned by the contentOrdering list.. why?
            if ((filteredIds.indexOf(newsItems[i].dataset.content) !== -1 || filteredIds.indexOf(newsItems[i].dataset.versionorigin) !== -1) && numDisplayed < itemsToDisplay) {
                newsItems[i].classList.remove('hide');
                numDisplayed++;
            } else {
                newsItems[i].classList.add('hide');
            }
        }

        if (numDisplayed < filteredIds.length) {
            isMore = true;
        }
        cmp.set('v.isMore', isMore);
        cmp.set('v.numResultsShowing', numDisplayed);
    },  // handleFiltering


    handleTimeAndFiltering: function(cmp, originIds) {
        var timeFilters = cmp.find('timeFilter'),
            dateFilters = cmp.get('v.dateFilters');

        for (var f = 0; f < timeFilters.length; f++) {
            if (timeFilters[f].get('v.value')) { // will be true when the filter checkbox is selected
                var filterName = timeFilters[f].get('v.name');
                console.log('active time filter: ' + filterName);
                for (var i = 0; i < dateFilters.length; i++) {
                    if (dateFilters[i].name === filterName) {
                        for (var j = originIds.length - 1; j >= 0; j--) {
                            if (dateFilters[i].originIds.indexOf(originIds[j]) === -1) {
                                originIds.splice(j, 1);
                            }
                        }
                    }
                }
            }
        }

        return originIds;
    },


    handleTimeOrFiltering: function(cmp, originIds, allIds) {
        var timeFilters = cmp.find('timeFilter'),
            dateFilters = cmp.get('v.dateFilters');

        for (var f = 0; f < timeFilters.length; f++) {
            if (timeFilters[f].get('v.value')) { // will be true when the filter checkbox is selected
                var filterName = timeFilters[f].get('v.name');
                console.log('active time filter: ' + filterName);
                for (var i = 0; i < dateFilters.length; i++) {
                    if (dateFilters[i].name === filterName) {
                        for (var j = 0; j < allIds.length; j++) {
                            if (dateFilters[i].originIds.indexOf(allIds[j]) !== -1) {
                                originIds.push(allIds[j]);
                            }
                        }
                    }
                }
            }
        }

        return originIds;
    },


    handleTagAndFiltering: function(cmp, originIds) {
        var tagFilters = cmp.find('tagFilter'),
            taxonomyFilters = cmp.get('v.taxonomyFilters');

        if (!tagFilters instanceof Array) { // if only one tag filter has returned from the server, this won't be an array
            tagFilters = [tagFilters]; // code below assumes tagFilters is an array
        }

        for (var f = 0; f < tagFilters.length; f++) {
            if (tagFilters[f].get('v.value')) {
                var filterName = tagFilters[f].get('v.name'),
                    rootTag = filterName.split('/')[1]; // starts with / so split[0] will be ""
                console.log('active tag filter: ' + filterName);
                for (var t = 0; t < taxonomyFilters.length; t++) {
                    if (taxonomyFilters[t].name === rootTag) {
                        var children = taxonomyFilters[t].children;
                        for (var p = 0; p < children.length; p++) {
                            if (children[p].filter === filterName) {
                                for (var j = originIds.length - 1; j >= 0; j--) {
                                    if (children[p].originIds.indexOf(originIds[j]) === -1) {
                                        originIds.splice(j, 1);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        return originIds;
    },


    handleTagOrFiltering: function(cmp, originIds, allIds) {
        var tagFilters = cmp.find('tagFilter'),
            taxonomyFilters = cmp.get('v.taxonomyFilters');

        if (!tagFilters instanceof Array) { // if only one tag filter has returned from the server, this won't be an array
            tagFilters = [tagFilters]; // code below assumes tagFilters is an array
        }

        for (var f = 0; f < tagFilters.length; f++) {
            if (tagFilters[f].get('v.value')) {
                var filterName = tagFilters[f].get('v.name'),
                    rootTag = filterName.split('/')[1]; // starts with / so split[0] will be ""
                console.log('active tag filter: ' + filterName);
                for (var t = 0; t < taxonomyFilters.length; t++) {
                    if (taxonomyFilters[t].name === rootTag) {
                        var children = taxonomyFilters[t].children;
                        for (var p = 0; p < children.length; p++) {
                            if (children[p].filter === filterName) {
                                for (var j = 0; j < allIds.length; j++) {
                                    if (children[p].originIds.indexOf(allIds[j]) !== -1) {
                                        originIds.push(allIds[j]);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        return originIds;
    },


    orderFilter: function(cmp, event, helper) {
        var order = cmp.find('orderFilter').get('v.value');
        cmp.set('v.resultsOrder', order);

        var el = cmp.find('taxonomySearchResults').getElement();
        var results = Array.prototype.slice.call(el.children); // convert HTMLCollection to Array so we can do array things

        if (order === 'date') {
            results.sort(helper.sortElementsDate).reverse();
        } else if (order === 'dateasc') {
            results.sort(helper.sortElementsDate);
        } else {
            results.sort(helper.sortElementsRelevance);
        }

        // using documentFragment lets us append all children at once and only cause one reflow
        var fragment = document.createDocumentFragment();
        for (var i = 0; i < results.length; i++) {
            fragment.appendChild(results[i]);
        }
        el.appendChild(fragment);

        helper.handleFiltering(cmp, event, helper, cmp.get('v.numResults'));
    },


    sortElementsRelevance: function(a, b) {
        var dataAttr = 'relevance',
            aVal = parseInt(a.dataset[dataAttr]),
            bVal = parseInt(b.dataset[dataAttr]);
        return $o.sortNumbers(aVal, bVal);
    },


    sortElementsDate: function(a, b) {
        var dataAttr = 'publisheddate',     // original published date, not most recent published date ('pubstartdate')
            aVal = parseInt(a.dataset[dataAttr]),
            bVal = parseInt(b.dataset[dataAttr]);

        return $o.sortNumbers(aVal, bVal);
    },


    addClickHandlers: function(container) {
        var anchors = container.getElementsByTagName('a');
        for (var i = 0; i < anchors.length; i++) {
            anchors[i].addEventListener('click', function (evt) {
                evt.preventDefault();

                var thisHref = evt.currentTarget.getAttribute('href');
                $o.navigateToURL(thisHref, {}, true);
            });
        }
    },


    // Number.isInteger polyfill
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger
    isInteger: function(value) {
        return typeof value === 'number' &&
                isFinite(value) &&
                Math.floor(value) === value;
    }
})