/*

 usage example:

 <script>
 ...
 var attributes = [
 ...
 {"name":"iconType", "value":$('.sldsIconContainer').sldsIconSelector('getIconType'), "type":"Text", "simple":true},
 {"name":"iconName", "value":$('.sldsIconContainer').sldsIconSelector('getIconName'), "type":"Text", "simple":true}
 ];
 ...

 $('.sldsIconContainer').sldsIconSelector({
 iconType: '{!iconType}',
 iconName: '{!iconName}',
 sldsPath: '{!URLFOR($Resource.slds214)}',
 disable: {!disableAll}
 });
 </script>
 ...
 <tr>
 <td>
 <label class="ocmsLabel">Lightning Experience Icon</label>
 <div class="sldsIconContainer"></div>
 </td>
 </tr>

 */

$.widget("stg_pe.sldsIconSelector", {
    _create: function() {
        this.icons = this._iconObj();

        this.$svg =  $('<span class="slds-icon_container slds-icon-standard-empty" style="margin-right: 1em;">' +
            '<svg id="iconSvg" aria-hidden="true" class="slds-icon slds-icon--large">' +
            '<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="' + this.options.sldsPath + '/assets/icons/standard-sprite/svg/symbols.svg#empty"></use>' +
            '</svg>' +
            '</span>');
        this.$iconType = $('<select id="iconType" style="margin-right: 0.5em;">' +
            '<option></option>' +
            '</select>');
        this.$iconName = $('<select id="iconName">' +
            '<option></option>' +
            '</select>');
        var $helpText = $('<span class="ocmsHelpText" style="margin-top: 0.7em">See <a href="https://www.lightningdesignsystem.com/icons/" target="_blank">Salesforce Lightning Design System</a> for a full list of icon previews.</span>');

        this.element.append($helpText)
            .append(this._markup());

        if (this.options.disable) {
            this.$iconType.attr('disabled', true);
            this.$iconName.attr('disabled', true);
        }

        // populate iconType options
        for (var key in this.icons) {
            this.$iconType.append('<option value="' + key + '">' + key.charAt(0).toUpperCase() + key.slice(1) + '</option>');
        }
        this.$iconType.val(this.options.iconType);
        this._populateIconNames(this.options.iconType, this.options.iconName);
        this._updateSldsIcon(this.options.iconType, this.options.iconName);

        this._on(this.$iconType, {
            change: '_changeType'
        });
        this._on(this.$iconName, {
            change: '_changeName'
        });
    },

    _changeType: function(evt) {
        this.options.iconType = evt.currentTarget.value;
        this._populateIconNames(this.options.iconType, this.options.iconName);
        this._updateSldsIcon('', '');
    },

    _changeName: function(evt) {
        this.options.iconName = evt.currentTarget.value;
        this._updateSldsIcon(this.options.iconType, this.options.iconName);
    },

    _populateIconNames: function(currentType, currentName) {
        var $el = this.$iconName;
        $el.empty();
        $el.append('<option></option>');
        if (currentType) {
            this.icons[currentType].forEach(function (item) {
                $el.append('<option value="' + item + '">' + item.charAt(0).toUpperCase() + item.slice(1) + '</option>');
            });
            $el.val(currentName);
        }
    },

    _updateSldsIcon: function(currentType, currentName) {
        var className = 'slds-icon-' + currentType + '-' + currentName.replace('_', '-');

        this.$svg.removeClass().addClass('slds-icon_container ' + className);
        this.$svg.find('use').attr('xlink:href', this.options.sldsPath + '/assets/icons/' + currentType + '-sprite/svg/symbols.svg#' + currentName);
    },

    getIconType: function() {
        return this.options.iconType;
    },

    getIconName: function() {
        return this.options.iconName;
    },


    _iconObj: function() {
        return {
            'custom': [
                'custom1', 'custom2', 'custom3', 'custom4', 'custom5', 'custom6', 'custom7', 'custom8', 'custom9', 'custom10',
                'custom11', 'custom12', 'custom13', 'custom14', 'custom15', 'custom16', 'custom17', 'custom18', 'custom19', 'custom20',
                'custom21', 'custom22', 'custom23', 'custom24', 'custom25', 'custom26', 'custom27', 'custom28', 'custom29', 'custom30',
                'custom31', 'custom32', 'custom33', 'custom34', 'custom35', 'custom36', 'custom37', 'custom38', 'custom39', 'custom40',
                'custom41', 'custom42', 'custom43', 'custom44', 'custom45', 'custom46', 'custom47', 'custom48', 'custom49', 'custom50',
                'custom51', 'custom52', 'custom53', 'custom54', 'custom55', 'custom56', 'custom57', 'custom58', 'custom59', 'custom60',
                'custom61', 'custom62', 'custom63', 'custom64', 'custom65', 'custom66', 'custom67', 'custom68', 'custom69', 'custom70',
                'custom71', 'custom72', 'custom73', 'custom74', 'custom75', 'custom76', 'custom77', 'custom78', 'custom79', 'custom80',
                'custom81', 'custom82', 'custom83', 'custom84', 'custom85', 'custom86', 'custom87', 'custom88', 'custom89', 'custom90',
                'custom91', 'custom92', 'custom93', 'custom94', 'custom95', 'custom96', 'custom97', 'custom98', 'custom99', 'custom100'
            ],
            'doctype': [
                'ai', 'attachment', 'audio', 'box_notes', 'csv', 'eps', 'excel', 'exe', 'flash', 'gdoc', 'gdocs', 'gform', 'gpres',
                'gsheet', 'html', 'image', 'keynote', 'link', 'mp4', 'overlay', 'pack', 'pages', 'pdf', 'ppt', 'psd', 'rtf', 'slide',
                'stypi', 'txt', 'unknown', 'video', 'visio', 'webex', 'word', 'xml', 'zip'
            ],
            'standard': [
                'account', 'announcement', 'answer_best', 'answer_private', 'answer_public', 'approval', 'apps', 'apps_admin', 'article',
                'avatar', 'avatar_loading', 'calibration', 'call', 'call_history', 'campaign', 'campaign_members', 'canvas', 'case',
                'case_change_status', 'case_comment', 'case_email', 'case_log_a_call', 'case_transcript', 'client', 'coaching', 'connected_apps',
                'contact', 'contract', 'custom', 'dashboard', 'default', 'document', 'drafts', 'email', 'email_chatter', 'empty', 'endorsement',
                'environment_hub', 'event', 'feed', 'feedback', 'file', 'flow', 'folder', 'forecasts', 'generic_loading', 'goals', 'group_loading',
                'groups', 'hierarchy', 'home', 'household', 'insights', 'investment_account', 'lead', 'link', 'log_a_call', 'marketing_actions',
                'merge', 'metrics', 'news', 'note', 'opportunity', 'orders', 'people', 'performance', 'person_account', 'photo', 'poll', 'portal',
                'post', 'pricebook', 'process', 'product', 'question_best', 'question_feed', 'quotes', 'recent', 'record', 'related_list',
                'relationship', 'report', 'reward', 'sales_path', 'scan_card', 'service_contract', 'skill_entity', 'social', 'solution',
                'sossession', 'task', 'task2', 'team_member', 'thanks', 'thanks_loading', 'today', 'topic', 'unmatched', 'user', 'work_order',
                'work_order_item'
            ]
        };
    },

    _markup: function() {
        // there has to be a better way to do this
        var $tr0 = $('<tr><th><label for="iconType">Icon</label></th><th><label for="iconType">Category</label></th><th><label for="iconName">Name</label></th></tr>');
        var $tr1 = $('<tr>');

        $('<td>').append(this.$svg).appendTo($tr1);
        $('<td>').append(this.$iconType).appendTo($tr1);
        $('<td>').append(this.$iconName).appendTo($tr1);

        return $('<table class="sldsIconSelector" style="margin-top: 0.7em; width: auto;">').append($tr0).append($tr1);
    }
});
