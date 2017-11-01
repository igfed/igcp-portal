({
    callServer : function(component,method,callback,params,cacheable) {
        var action = component.get(method);
        if (params) {
            action.setParams(params);
        }
        if (cacheable) {
            action.setStorable();
        }

        action.setCallback(this,function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                // pass returned value to callback function
                callback.call(this,response.getReturnValue());
            } else if (state === "ERROR") {
                // generic error handler
                var errors = response.getError();
                if (errors) {
                    $A.log("Errors", errors);
                    if (errors[0] && errors[0].message) {
                        throw new Error("Error" + errors[0].message);
                    }
                } else {
                    throw new Error("Unknown Error");
                }
            }
        });

        $A.enqueueAction(action);
    },  // callServer


    setTimeSincePublished: function (component, event, helper, elements, metadata) {
        // "readable time" container; e.g. 22 Days ago
        for (var nIt = 0; nIt < elements.length; ++nIt) {
            elements[nIt].innerHTML = helper.getTimeSincePublished(metadata.displayedDate, metadata.currentTimestamp);
        }
    },  // setTimeSincePublished


    setFormattedPublishDate: function (component, event, helper, elements, metadata) {
        // absolute time; e.g. January 6, 2017
        var displayedDateObj = new Date(parseInt(metadata.displayedDate)),
            versionDate = new Date(parseInt(metadata.pubstartdate));

        for (var nIt = 0; nIt < elements.length; ++nIt) {
            elements[nIt].innerHTML = $o.fullDateWithTime(displayedDateObj);              // e.g. January 16, 2017 • 9:20 am

            if (metadata.pubstartdate > metadata.publisheddate) {
                elements[nIt].innerHTML += ' (' + $A.get('$Label.c.ec_Updated_Publish_Date_Lead_In') + ' ' +
                    $A.localizationService.formatDate(versionDate, 'MMM-DD') + $o.timeSuffix(versionDate) + ')';
            }
        }
    },  // setFormattedPublishDate


    installClickForBackButton: function (component, event, helper, backButtons) {
        for (var nIt = 0; nIt < backButtons.length; ++nIt) {
            backButtons[nIt].addEventListener('click', function (evt) {
                evt.preventDefault();
                evt.stopPropagation();

                if (component.get('v.loadedByTaxLoader')) {
                    var bClicked = component.get('v.backClicked');
                    component.set('v.backClicked', !bClicked);
                } else {
                    $o.navigateToURL(sessionStorage.getItem('previous'), [], true);
                }
            });
        }
    },  // installClickForBackButton


    installClickForLikeButton: function (component, event, helper, likeButtons) {
        for (var nIt = 0; nIt < likeButtons.length; ++nIt) {
            likeButtons[nIt].addEventListener('click', function (evt) {
                evt.stopPropagation();
                var originId = evt.currentTarget.dataset.versionorigin;
                component.set('v.likedContent', originId);
            });
        }
    },  // installClickForLikeButton


    // TODO - this method may have issues
    //      - top-level var container unused
    //      - likedContentList.includes maybe unknown function? likely just JSLint
    //      - is articles[] defined?!

    applyLikeCounts : function(component, helper) {
        var likeCounts = component.get('v.likeCounts');
        var likedContentList = component.get('v.likedContentList');
        var unknownCounts = [];
        var container = component.find('contentViewer').getElement();
        var langCode = $A.get('$Locale.language');
        if (langCode === 'en') {
            langCode = 'en_US';
        }

        var originId = component.get('v.originId');

        if (!likeCounts[originId]) {
            // we don't know about this content yet, add it to a list and hold for later
            unknownCounts.push(originId);
        } else {
            // TODO this branch never executes; we'll never know about like counts unless we pass the values in to this component from TaxonomyLoader
            // we know about this content. update its count
            var button = articles[i].getElementsByClassName('likeButton');
            var counter = articles[i].getElementsByClassName('likeCount');
            if (counter.length) {
                counter[0].innerHTML = likeCounts[originId] + '';
            }
            /*
            *  IE 11 doens't support .includes on arrays;
            * */
            var included;
            if (Array.prototype.includes){
                included = likedContentList.includes(originId);
            } else {
               included = $o.arrayIncludes(likedContentList, originId);
            }
            /* end polyfill for IE .includes. */
            // if (likedContentList.includes(originId)) {
            if (included) {
                button[0].classList.add('slds-is-selected');
            }
        }

        if (unknownCounts.length) {
            helper.callServer(component, "c.getBulkLikeCounts", function(json) {
                console.log(json);
                var response = JSON.parse(json),
                    likeCounts = component.get('v.likeCounts'),
                    likedContentList = component.get('v.likedContentList'),
                    container = component.find('contentViewer').getElement();

                for (var item in response.socialData) {
                    likeCounts[item] = response.socialData[item].likes;

                    var button = container.querySelectorAll('.likeButton[data-versionorigin="' + item + '"]');
                    if (button.length) {
                        helper.createChatterStuff(component, response.socialData[item].socialID);

                        var el = button[0].getElementsByClassName('likeCount')[0];
                        el.innerHTML = likeCounts[item] + '';

                        var activity = response.socialData[item].socialActivity,
                            likedByMe = false;
                        if (activity) {
                            likedByMe = activity.likedByMe;
                        }

                        if (likedByMe) {
                            button[0].classList.add('slds-is-selected');
                            likedContentList.push(item);
                        }
                    }
                }

                component.set('v.likeCounts', likeCounts);
                component.set('v.likedContentList', likedContentList);
            }, {
                originIds: unknownCounts,
                siteName: component.get('v.siteName'),
                langCode: langCode
            });
        }
    },  // applyLikeCounts

    getTimeSincePublished: function(itemTimestamp, currentTimestamp) {

        // new Date().getTime();

        var msPerMinute = 60 * 1000;
        var msPerHour = msPerMinute * 60;
        var msPerDay = msPerHour * 24;
        var msPerMonth = msPerDay * 30;
        var msPerYear = msPerDay * 365;

        var elapsed = currentTimestamp - itemTimestamp;

        // debug.log('current - previous = elapsed ' + current + ' - ' + previous + ' = ' + elapsed);

        var output = '';
        var t;
        if (elapsed < msPerMinute) {
            t = Math.round(elapsed/1000);
            if (t==1) {
                output = $o.supplant($A.get("$Label.c.ec_TaxonomyLoader_Second_Ago"), [t]);
                //output = $A.get("$Label.c.ec_TaxonomyLoader_Second_Ago").supplant([t]);
            }
            else {
                output = $o.supplant($A.get("$Label.c.ec_TaxonomyLoader_Seconds_Ago"), [t]);
                //output = $A.get("$Label.c.ec_TaxonomyLoader_Seconds_Ago").supplant([t]);
            }
        } else if (elapsed < msPerHour) {
            t = Math.round(elapsed/msPerMinute);
            if (t==1) {
                output = $o.supplant($A.get("$Label.c.ec_TaxonomyLoader_Minute_ago"), [t]);
                //output = $A.get("$Label.c.ec_TaxonomyLoader_Minute_ago").supplant([t]);
            }
            else {
                output = $o.supplant($A.get("$Label.c.ec_TaxonomyLoader_Minutes_ago"), [t]);
                //output = $A.get("$Label.c.ec_TaxonomyLoader_Minutes_ago").supplant([t]);
            }
        } else if (elapsed < msPerDay ) {
            t = Math.round(elapsed/msPerHour );
            if (t==1) {
                output = $o.supplant($A.get("$Label.c.ec_TaxonomyLoader_Hour_Ago"), [t]);
                //output = $A.get("$Label.c.ec_TaxonomyLoader_Hour_Ago").supplant([t]);
            }
            else {
                output = $o.supplant($A.get("$Label.c.ec_TaxonomyLoader_Hours_Ago"), [t]);
                //output = $A.get("$Label.c.ec_TaxonomyLoader_Hours_Ago").supplant([t]);
            }
        } else if (elapsed < msPerMonth) {
            t = Math.round(elapsed/msPerDay);
            if (t==1) {
                output = $o.supplant($A.get("$Label.c.ec_TaxonomyLoader_Day_Ago"), [t]);
                //output = $A.get("$Label.c.ec_TaxonomyLoader_Day_Ago").supplant([t]);
            }
            else {
                output = $o.supplant($A.get("$Label.c.ec_TaxonomyLoader_Days_Ago"), [t]);
                //output = $A.get("$Label.c.ec_TaxonomyLoader_Days_Ago").supplant([t]);
            }
        } else if (elapsed < msPerYear) {
            t = Math.round(elapsed/msPerMonth);
            if (t==1) {
                output = $o.supplant($A.get("$Label.c.ec_TaxonomyLoader_Month_Ago"), [t]);
                //output = $A.get("$Label.c.ec_TaxonomyLoader_Month_Ago").supplant([t]);
            }
            else {
                output = $o.supplant($A.get("$Label.c.ec_TaxonomyLoader_Months_Ago"), [t]);
                //output = $A.get("$Label.c.ec_TaxonomyLoader_Months_Ago").supplant([t]);
            }
        } else {
            t = Math.round(elapsed/msPerYear);
            if (t==1) {
                output = $o.supplant($A.get("$Label.c.ec_TaxonomyLoader_Year_Ago"), [t]);
                //output = $A.get("$Label.c.ec_TaxonomyLoader_Year_Ago").supplant([t]);
            }
            else {
                output = $o.supplant($A.get("$Label.c.ec_TaxonomyLoader_Years_Ago"), [t]);
                //output = $A.get("$Label.c.ec_TaxonomyLoader_Years_Ago").supplant([t]);
            }
        }
        return output;
    }   // getTimeSincePublished
})