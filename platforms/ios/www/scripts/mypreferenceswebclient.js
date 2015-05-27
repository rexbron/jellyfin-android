﻿(function ($, window, document) {

    function loadForm(page, userId, displayPreferences) {

        $('#selectMaxBitrate', page).val(AppSettings.maxStreamingBitrate()).selectmenu("refresh");
        $('#selectMaxChromecastBitrate', page).val(AppSettings.maxChromecastBitrate()).selectmenu("refresh");

        $('#chkExternalVideoPlayer', page).checked(AppSettings.enableExternalPlayers()).checkboxradio("refresh");

        $('#selectThemeSong', page).val(appStorage.getItem('enableThemeSongs-' + userId) || '').selectmenu("refresh");
        $('#selectBackdrop', page).val(appStorage.getItem('enableBackdrops-' + userId) || '').selectmenu("refresh");

        $('#selectHomeSection1', page).val(displayPreferences.CustomPrefs.home0 || '').selectmenu("refresh");
        $('#selectHomeSection2', page).val(displayPreferences.CustomPrefs.home1 || '').selectmenu("refresh");
        $('#selectHomeSection3', page).val(displayPreferences.CustomPrefs.home2 || '').selectmenu("refresh");
        $('#selectHomeSection4', page).val(displayPreferences.CustomPrefs.home3 || '').selectmenu("refresh");

        $('#selectEnableItemPreviews', page).val(AppSettings.enableItemPreviews().toString().toLowerCase()).selectmenu("refresh");

        $('#chkEnableLibraryTileNames', page).checked(displayPreferences.CustomPrefs.enableLibraryTileNames != '0').checkboxradio("refresh");

        Dashboard.hideLoadingMsg();
    }

    function saveUser(page, userId, displayPreferences) {

        appStorage.setItem('enableThemeSongs-' + userId, $('#selectThemeSong', page).val());
        appStorage.setItem('enableBackdrops-' + userId, $('#selectBackdrop', page).val());

        displayPreferences.CustomPrefs.home0 = $('#selectHomeSection1', page).val();
        displayPreferences.CustomPrefs.home1 = $('#selectHomeSection2', page).val();
        displayPreferences.CustomPrefs.home2 = $('#selectHomeSection3', page).val();
        displayPreferences.CustomPrefs.home3 = $('#selectHomeSection4', page).val();
        displayPreferences.CustomPrefs.enableLibraryTileNames = $('#chkEnableLibraryTileNames', page).checked() ? '1' : '0';

        ApiClient.updateDisplayPreferences('home', displayPreferences, userId, 'webclient').done(function () {

            Dashboard.alert(Globalize.translate('SettingsSaved'));

        });
    }

    function onSubmit() {

        var page = $(this).parents('.page');

        Dashboard.showLoadingMsg();

        AppSettings.enableExternalPlayers($('#chkExternalVideoPlayer', page).checked());

        AppSettings.maxStreamingBitrate($('#selectMaxBitrate', page).val());
        AppSettings.maxChromecastBitrate($('#selectMaxChromecastBitrate', page).val());

        AppSettings.enableItemPreviews($('#selectEnableItemPreviews', page).val() == 'true');

        var userId = getParameterByName('userId') || Dashboard.getCurrentUserId();

        ApiClient.getDisplayPreferences('home', userId, 'webclient').done(function (result) {

            saveUser(page, userId, result);

        });

        // Disable default form submission
        return false;
    }

    $(document).on('pageinitdepends', "#webClientPreferencesPage", function () {

        var page = this;

        $('.webClientPreferencesForm', page).off('submit', onSubmit).on('submit', onSubmit);

    }).on('pageshowready', "#webClientPreferencesPage", function () {

        var page = this;

        Dashboard.showLoadingMsg();

        var userId = getParameterByName('userId') || Dashboard.getCurrentUserId();

        ApiClient.getDisplayPreferences('home', userId, 'webclient').done(function (result) {

            loadForm(page, userId, result);

        });

        $('.fldEnableBackdrops', page).show();

        if (Dashboard.isRunningInCordova()) {
            $('.homePageConfigurationSection', page).hide();
        } else {
            $('.homePageConfigurationSection', page).show();
        }

        if (AppInfo.hasKnownExternalPlayerSupport) {
            $('.labelNativeExternalPlayers', page).show();
            $('.labelGenericExternalPlayers', page).hide();
        } else {
            $('.labelGenericExternalPlayers', page).show();
            $('.labelNativeExternalPlayers', page).hide();
        }
    });

})(jQuery, window, document);