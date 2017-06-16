<aura:application >
    <ltng:require styles="{!$Resource.patternlib + '/pattern-lib/styles/foundation.css'}"/>
    <ltng:require scripts="{!join(',', 
    	$Resource.patternlib + '/pattern-lib/scripts/jquery.js',
    	$Resource.patternlib + '/pattern-lib/scripts/what-input.js',
    	$Resource.patternlib + '/pattern-lib/scripts/foundation.js')}" 
	afterScriptsLoaded="{!c.scriptsLoaded}"/>
    
    <style>
    	html,
        body {
          width: 100%;
          height: 100%;
          background: #eee;
          margin: 0;
          border: 0;
          color: #111;
        }
        
        .image-logo {
            height: 35px;
    		width: 120px;
        }
    </style>

	<nav>
        
    	<div class="top-bar">
          <div class="top-bar-left">
            <a class="home-link" href="/">
               <img src="{!$Resource.images + '/images/logo-en-color.svg'}" alt="" class="image-logo" />
            </a>
          </div>
          <div class="top-bar-right">
            <ul class="dropdown menu" data-dropdown-menu="">
              <li>
                <a href="#">One</a>
                <ul class="menu vertical">
                  <li><a href="#">One</a></li>
                  <li><a href="#">Two</a></li>
                  <li><a href="#">Three</a></li>
                </ul>
              </li>
              <li><a href="#">Two</a></li>
              <li><a href="#">Three</a></li>
            </ul>
          </div>
        </div>
    </nav>

</aura:application>