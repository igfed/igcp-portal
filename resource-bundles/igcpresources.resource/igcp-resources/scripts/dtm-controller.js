(function ($) {

  window.digitalData = window.digitalData || {};
  window.digitalData.page = {};
  window.digitalData.page.pageInfo = {};
  window.digitalData.events = [];

  var $this,
    adobeLoader,
    $component,
    $container;

  // Event object that will be pushed into events array
  var event = {};
  event.component = {};
  event.container = {};
  event.page = {};
  event.template = {};
  event.error = {};
  event.form = {};
  event.search = {};
  event.tool = {};
  event.advisor = {};
  event.download = {};

  // Handler for Direct calls
  window.dcHandler = (function () {

    function parse(dcName, data) {
      console.log('parse direct calls');
      event.type = 'dc';
      _constructEventObj();
      _executeDirectCall(dcName);
    }

    return {
      parse: parse
    };
  })();


  function init() {

    // Capture page data
    window.digitalData.pageInstanceID = _getPageName() + window.location.hostname + "";
    window.digitalData.page.pageInfo.pageName = _getPageName();
    window.digitalData.page.pageInfo.language = _getPageLanguage();
    window.digitalData.page.pageInfo.server = window.location.href;
    window.digitalData.page.pageInfo.timezone = new Date().getTimezoneOffset() / 60;


    console.log(window.digitalData);

    // Only fire this in Salesforce
    _adobeScriptLoader();

    // Register click event handlers
    $('.aa-click').on('click', function (e) {
      e.preventDefault();
      event.type = 'click';
      _constructEventObj($(this));
      _executeDirectCall(event.dcName);
    });

    // Register hover event handlers
    $('.aa-hover').on('click', function () {
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

  function _adobeScriptLoader() {
    adobeLoader = setInterval(function () {
      if (window._satellite) {
        window._satellite.pageBottom();
        clearInterval(adobeLoader);
      }
    }, 500);
  }

  function _constructEventObj($this) {
    event.page.pageInfo.referrer = window.location.href;

    if (event.type === 'click' || event.type === 'hover') {
      var topics,
        tags = [],
        keyValue;

      event.container.topics = [];
      event.container.tags = [];

      // Capture trigger data
      event.dcName = $this.data('aa-dcname');
      event.goal = $this.data('aa-goal');
      event.linkLabel = $this.data('aa-link-label');
      event.parentID = $this.data('aa-parent');

      // Is it a nested event or one connected via an ID?
      if (event.parentID) {
        $component = $('body').find('[data-aa-id="' + event.parentID + '"]');
        $container = $component.parents('.ig-analytics-container');
      } else {
        $component = $this.parents('.ig-analytics-component');
        $container = $this.parents('.ig-analytics-container');
      }

      // Capture component data
      if ($component.length > 0) {
        event.component.id = $component.data('aa-id');
        event.component.name = $component.data('aa-name');
        event.component.location = $component.data('aa-location');
        if (!event.parentID) {
          event.parentID = event.component.id;
        }
      }

      // Capture container data
      if ($container.length > 0) {
        event.container.id = $container.data('aa-id');
        event.container.name = $container.data('aa-name');
        event.container.category = $container.data('aa-category');
        event.container.location = $container.data('aa-location');
        event.container.product = $container.data('aa-product');
        event.container.category = $container.data('aa-category');
        topics = $container.data('aa-topics');
        if (topics) {
          event.container.topics = topics.split(',');
        }
        if ($container.data('aa-tags')) {
          tags = $container.data('aa-tags').split(',');
          tags.forEach(function (el) {
            keyValue = el.split('::');
            event.container.tags.push({
              "name": keyValue[0],
              "value": keyValue[1]
            })
          })
        }
      }
    }

    if (event.type = 'dc') {

    }

    window.digitalData.events.push(event);
    console.log(window.digitalData.events);
  }

  function _executeDirectCall(name) {
    _satellite.track(name);
  }

  init();


})(jQuery)