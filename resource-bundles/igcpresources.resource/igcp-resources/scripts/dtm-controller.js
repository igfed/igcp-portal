(function ($) {

  window.digitalData = window.digitalData || {};
  window.digitalData.page = {};
  window.digitalData.page.pageInfo = {};
  window.digitalData.page.category = {};
  window.digitalData.events = [];

  var $this,
    $component

  // Event object that will be pushed into events array
  var event = {};
  event.component = {};
  event.page = {};
  event.form = {};
  event.search = {};
  event.tool = {};
  event.advisor = {};
  event.download = {};

  // Setup custom tracking handler for 'true' direct calls from JS
  window.dtmCall = function (dcName, data) {
    console.log('parse direct call');
    event.type = 'dc';
    _constructEventObj(data);
    _executeDirectCall(dcName);
  }

  function init() {

    // Capture page data
    window.digitalData.pageInstanceID = _getPageName() + ":" + window.location.hostname + "";
    window.digitalData.page.pageInfo.pageName = _getPageName();
    window.digitalData.page.pageInfo.language = _getPageLanguage();
    window.digitalData.page.pageInfo.server = window.location.href;
    window.digitalData.page.pageInfo.timezone = new Date().getTimezoneOffset() / 60;
    window.digitalData.page.category.primaryCategory = _getSiteSection();

    // Only fire this in Salesforce
    // window._satellite.pageBottom();

    // Register click event handlers
    $('.aa-click').on('click', function (e) {
      event.type = 'click';
      _constructEventObj($(this));
      _executeDirectCall(event.dcName);
    });

    // Register hover event handlers
    $('.aa-hover').on('click', function (e) {
      event.type = 'hover';
      _constructEventObj($(this));
      _executeDirectCall(event.dcName);
    });
  }

  function _getPageName() {
    return document.title;
  }

  function _getPageLanguage() {
    var lang;

    if (window.location.href.indexOf('groupe') > 0 || window.location.href.indexOf('/fr/') > 0) {
      lang = 'fr'
    } else {
      lang = 'en'
    }
    return lang;
  }


  function _getSiteSection() {
    return window.location.href.substr(window.location.href.lastIndexOf('/') + 1)
  }

  function _constructEventObj($this) {
    event.page.referrer = window.location.href;

    if (event.type === 'click' || event.type === 'hover') {
      var topics,
        tags = [],
        keyValue;

      event.component.topics = [];
      event.component.tags = [];

      // Capture trigger data
      event.dcName = $this.data('aa-dcname');
      event.goal = $this.data('aa-goal');
      event.linkLabel = $this.data('aa-link-label');
      event.parentID = $this.data('aa-parent');

      // Store component container node  
      $component = $this.parents('.aa-component');

      // Capture component data
      if ($component.length > 0) {
        event.component.id = $component.data('aa-id');
        event.component.name = $component.data('aa-name');
        event.component.location = $component.data('aa-location');

        // If there is no parentID set
        if (!event.parentID) {
          event.parentID = event.component.id;
        }

        // Topics ['topic1', 'topic2' ...]
        topics = $component.data('aa-topics');
        if (topics) {
          event.component.topics = topics.split(',');
        }

        // Tags ['key1::value1', 'key2::value2' ...]
        if ($component.data('aa-tags')) {
          tags = $component.data('aa-tags').split(',');
          tags.forEach(function (el) {
            keyValue = el.split('::');
            event.component.tags.push({
              "name": keyValue[0],
              "value": keyValue[1]
            })
          })
        }
      }

    }

    if (event.type === 'dc') {
      // Move 'data' props into event object
      for (var prop in $this) {
        if ($this.hasOwnProperty(prop)) {
          event[prop] = $this[prop];
        }
      }
    }

    window.digitalData.events.push(event);
    console.log(window.digitalData);
  }

  function _executeDirectCall(name) {
    window._satellite.track(name);
  }

  init();


})(jQuery)