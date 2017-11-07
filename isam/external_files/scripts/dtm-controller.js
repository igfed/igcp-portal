$(document).ready(function () {
  (function () {

    window.digitalData = window.digitalData || {};
    window.digitalData.page = {};
    window.digitalData.page.pageInfo = {};
    window.digitalData.page.category = {};
    window.digitalData.events = [];

    var $this,
      $component

    // Setup custom tracking handler for 'true' direct calls from JS
    window._aa.track = function (dcName, data) {
      _constructEventObj(data, 'dc');
      _executeDirectCall(dcName);
    }

    // Certain Portal pages need to have click handlers attached on the fly
    window._aa.registerHandlers = function () {
      _registerHandlers();
    }

    function init() {
      console.log('init');
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
      _registerClickHandlers();
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

    function _registerHandlers() {
      $("[data-aa-type='click']").on('click', function (e) {
        if ($(this).data('aaDcname') && $(this).data('aaDcname') !== 'none') {
          e.stopPropagation();
          e.stopImmediatePropagation();
          _constructEventObj($(this), 'click');
        }
      });

      // Register hover event handlers
      $("[data-aa-type='hover']").on('hover', function (e) {
        if ($(this).data('aaDcname') && $(this).data('aaDcname') !== 'none') {
          e.stopPropagation();
          e.stopImmediatePropagation();
          _constructEventObj($(this), 'hover');
        }
      });
    }

    function _getSiteSection() {
      return window.location.href.substr(window.location.href.lastIndexOf('/') + 1)
    }

    function _constructEventObj($this, type) {
      // Event object that will be pushed into events array
      var event = {};
      event.component = {};
      event.page = {};
      event.form = {};
      event.search = {};
      event.tool = {};
      event.advisor = {};
      event.download = {};
      event.type = type;
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
        $component = $this.parents('[data-aa-component]');

        // Capture component data
        if ($component.length > 0) {
          event.component.id = $component.data('aa-id');
          event.component.name = $component.data('aa-component');
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

          // Store new event
          window.digitalData.events.push(event);

          // Send to DTM
          _executeDirectCall(event.dcName);
        }

      }

      if (event.type === 'dc') {
        // Move 'data' props into event object
        console.log($this);
        for (var prop in $this) {
          if ($this.hasOwnProperty(prop)) {
            event[prop] = $this[prop];
          }
        }

        // Store new event
        window.digitalData.events.push(event);
      }
    }

    function _executeDirectCall(name) {
      console.log(window.digitalData);
      window._satellite.track(name);
    }

    init();


  })()
})