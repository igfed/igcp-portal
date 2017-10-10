(function ($) {

  window.digitalData = window.digitalData || {};
  window.digitalData.page = {};
  window.digitalData.page.pageInfo = {};

  var event = {},
    $this,
    adobeLoader,
    $component,
    $container;
  event.component = {};
  event.container = {};
  event.template = {};


  function init() {
    // Capture page data
    window.digitalData.pageInstanceID = getPageName() + window.location.hostname + "",
    window.digitalData.page.pageInfo.pageName = getPageName(),
    window.digitalData.page.pageInfo.language = getPageLanguage(),
    window.digitalData.page.pageInfo.server = window.location.href,
    window.digitalData.page.pageInfo.timezone = new Date().getTimezoneOffset() / 60
      

    console.log(window.digitalData);

    // Only fire this in Salesforce
    adobeBottomLoader();

    // Register click event handler
    $('.aa-click').on('click', function (e) {
      e.preventDefault();
      event.type = 'click';
      constructEventObj($(this));
    });

    // Register hover event handler
    $('.aa-hover').on('click', function () {
      event.type = 'hover';
      constructEventObj($(this));
    });
  }

  function getPageName() {
    return document.title;
  }

  function getPageLanguage() {
    var lang;

    if (window.location.href.indexOf('groupe') > 0 || window.location.href.indexOf('/fr/') > 0) {
      lang= 'fr'
    } else {
      lang = 'en'
    }

    return lang;

  }

  function adobeBottomLoader() {
    adobeLoader = setInterval(function () {
      if (window._satellite) {
        window._satellite.pageBottom();
        clearInterval(adobeLoader);
      }
    }, 500);
  }

  function constructEventObj($this) {
    var topics;
    var tags = [];
    var keyValue;

    event.container.topics = [];
    event.container.tags = [];

    // Capture trigger data
    event.goal = $this.data('aa-goal');
    event.label = $this.data('aa-link-label');
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
    event.component.id = $component.data('aa-id');
    event.component.name = $component.data('aa-name');
    event.component.location = $component.data('aa-location');
    if (!event.parentID) {
      event.parentID = event.component.id;
    }

    // Capture container data
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

    window.digitalData.events.push(event);
    console.log(window.digitalData.events);
  }

  init();
})(jQuery)