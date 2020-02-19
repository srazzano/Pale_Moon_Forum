// ==UserScript==
// @name          Pale Moon Forum
// @id            srazzano/Pale Moon Forum@greasespot.net
// @version       1.0.2
// @namespace     srazzano
// @description   Pale Moon Forum Tweaks
// @author        Sonny Razzano
// @include       https://forum.palemoon.org*
// @icon          https://raw.githubusercontent.com/srazzano/Images/master/logo.png
// @homepageURL   https://github.com/srazzano/Pale_Moon_Forum
// @downloadURL   https://raw.githubusercontent.com/srazzano/Pale_Moon_Forum/master/Pale_Moon_Forum.user.js
// @support       srazzano@gmail.com
// @grant         GM_addStyle
// @grant         GM_getValue
// @grant         GM_setValue
// ==/UserScript==

(function () {

  'use strict';

  const timerInterval = 10000,
        cssRule = '/* AGENT_SHEET */ @-moz-document domain("forum.palemoon.org")',
        customCheckbox = true,
        customScrollbar = true,
        bodyBG = '#F0F0F0',
        fontSize = '110%',
        headerBG = 'linear-gradient(#5BA4ED, #314A85)',
        headerText = '#FFF',
        boardBG = 'linear-gradient(#4D85CA, #314A85)',
        boardHoverBG = '#001752',
        lockedBG = '#FFEAEA',
        stickyBG = '#FFEAEA',
        textColor = '#FFF',
        textHoverColor = '#FFF',
        scrollbarSlider = '#001752',
        scrollbarThumb = 'linear-gradient(to right, #5BA4ED, #314A85)',
        scrollbarThumbHover = 'linear-gradient(to right, #B2D2F3, #6181C5)',
        bullet = '\u2022',
        textPaleMoon = 'Pale Moon ',
        linkAddonsSite = 'add-ons site',
        Url1 = 'https://www.palemoon.org/',
        Url2 = 'https://addons.palemoon.org/extensions/',
        textInA = ' (in a ',
        linkHomePage = 'home page',
        linkNewTab = 'new tab',
        textBracket = ')',
        hideStats = 'Hide stats',
        hideFooter = 'Hide footer',
        viewBoardsText = 'View All Boards',
        viewBoardsTip = 'View All Unchecked Boards',
        hideBoardsText = 'Hide Unchecked Boards',
        hideBoardsTip = 'Hide All Unchecked Boards',
        dateTimeTip = 'Current Local Time',
        Weekday = 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday',
        WeekdayAbbr = 'Sun,Mon,Tue,Wed,Thu,Fri,Sat',
        Month = 'January,February,March,April,May,June,July,August,September,October,November,December',
        MonthAbbr = 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec',
        MonthNo = '1,2,3,4,5,6,7,8,9,10,11,12',
        DayNo = '"",1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31',
        DayOrd = '"",1st,2nd,3rd,4th,5th,6th,7th,8th,9th,10th,11th,12th,13th,14th,15th,16th,17th,18th,19th,20th,21st,22nd,23rd,24th,25th,26th,27th,28th,29th,30th,31st';

  var timer_Interval,
      ActionBar = $('.action-bar', $('#page-body'), 1),
      Link0 = $c('a', {id: 'aLink0', textContent: linkNewTab.toUpperCase()}, [{type: 'click', fn: function() {window.open(Url1, '_blank')}}]),
      Label0 = $n('text', {textContent: textBracket}),
      Separator = $c('span', {id: 'aSep', textContent: bullet}),
      Label1 = $n('text', {textContent: textPaleMoon}),
      Link1 = $c('a', {id: 'aLink1', href: Url2, textContent: linkAddonsSite.toUpperCase()}),
      Label2 = $n('text', {textContent: textInA}),
      Link2 = $c('a', {id: 'aLink2', textContent: linkNewTab.toUpperCase()}, [{type: 'click', fn: function() {window.open(Url2, '_blank')}}]),
      Label3 = $n('text', {textContent: textBracket}),
      Bullet = $c('span', {id: 'aBull', textContent: bullet}),
      SiteDescription = $('#site-description'),
      SiteDescriptionP = $q('#site-description > p'),
      NavMain = $('#nav-main'),
      NavBreadcrumbs = $('#nav-breadcrumbs'),
      IconNotification = $q('.icon-notification > a > strong'),
      IconPM = $q('.icon-pm > a > strong'),
      DateTime = $q('#page-body > p:nth-child(2)'),
      url = window.location.href.toLowerCase(),
      pmindex = url.match('https://forum.palemoon.org/index'),
      pmforum = url.match('https://forum.palemoon.org/viewforum'),
      pmtopic = url.match('https://forum.palemoon.org/viewtopic'),
      pmsearch = url.match('https://forum.palemoon.org/search'),
      pmucp = url.match('https://forum.palemoon.org/ucp');

  function $(q, root, single, context) {
    root = root || document;
    context = context || root;
    if (q[0] == '#') return root.getElementById(q.substr(1));
    if (q[0] == '.') {
      if (single) return root.getElementsByClassName(q.substr(1))[0];
      return root.getElementsByClassName(q.substr(1));
    }
    if (q.match(/^[\/\.]/)) {
      if (single) return root.evaluate(q, context, null, 9, null).singleNodeValue;
      var arr = [], 
          xpr = root.evaluate(q, context, null, 7, null);
      for (var i = 0; i < xpr.snapshotLength; i++) arr.push(xpr.snapshotItem(i));
      return arr;
    }
    if (single) return root.getElementsByTagName(q)[0];
    return root.getElementsByTagName(q);
  }

  function $c(type, props, evls) {
    var node = document.createElement(type);
    if (props && typeof props == 'object') {
      for (var prop in props) {
        if (typeof node[prop] == 'undefined') node.setAttribute(prop, props[prop]);
        else node[prop] = props[prop];
    } }
    if (evls instanceof Array) {
      for (var i = 0; i < evls.length; i++) {
        var evl = evls[i];
        if (typeof evl.type == 'string' && typeof evl.fn == 'function') node.addEventListener(evl.type, evl.fn, false);
    } }
    return node;
  }

  function $n(type, props) {
    var node = document.createTextNode(type);
    if (props && typeof props == 'object') for (var prop in props) node[prop] = props[prop];
    return node;
  }

  function $q(el, all) {
    if (all) return document.querySelectorAll(el);
    return document.querySelector(el);
  }

  function aDateTime() {
    var date = new Date(),
        weekday = date.getDay(),
        mth = date.getMonth(),
        dy = date.getDate(),
        hour12 = date.getHours(),
        hour24 = hour12,
        minute = date.getMinutes(),
        second = date.getSeconds(),
        daynames = Weekday.split(','),
        daynames2 = WeekdayAbbr.split(','),
        months = Month.split(','),
        months2 = MonthAbbr.split(','),
        months3 = MonthNo.split(','),
        days = DayNo.split(','),
        days2 = DayOrd.split(','),
        daynameabbr = daynames2[weekday] + '. ',
        daynamelong = daynames[weekday] + ', ',
        monthabbr = months2[mth] + '. ',
        monthlong = months[mth] + ' ',
        monthnum = months3[mth] + ' ',
        daynum = days[dy] + ', ',
        dayord = days2[dy] + ', ',
        yearlong = date.getFullYear(),
        yearshort = yearlong - 2000, ampm;
    if (hour24 > 12) hour12 = hour24 - 12;
    if (hour24 === 0) hour12 = 12;
    if (hour24 < 10) hour24 = '0' + hour24;
    hour24 < 12 ? ampm = ' AM' : ampm = ' PM';
    minute < 10 ? minute = ':0' + minute : minute = ':' + minute;
    second < 10 ? second = ':0' + second : second = ':' + second;
    // OPTIONS: (daynameabbr / daynamelong) + bullet + (monthabbr / monthlong / monthnum) + (daynum / dayord) +  (yearlong / yearshort) + bullet + (hour12 / hour24) + (minute) + (second) + (ampm)
    return daynameabbr + '\u2022\u2004' + monthabbr + daynum + yearlong + '\u2004\u2022\u2005' + hour12 + minute + ampm;
  }

  function CollapseExpand(e) {
    var bool = GM_getValue(e.id) !== false ? false : true,
        elm = e.parentNode,
        sty = bool ? 'block' : 'none';
    GM_setValue(e.id, bool); 
    elm.setAttribute('opened', bool);
    elm.childNodes[2].lastElementChild.style.display = sty;
  }

  function HideFooter(e) {
    var bool = GM_getValue(e.id) !== false ? false : true,
        sty = bool ? 'none' : '-moz-box';
    GM_setValue(e.id, bool);
    $('#hidefooter').checked = bool;
    if ($('#page-footer')) $('#page-footer').style.display = sty;
  }

  function HideStats(e) {
    var bool = GM_getValue(e.id) !== false ? false : true,
        sty = bool ? 'none' : 'block';
    GM_setValue(e.id, bool);
    $('#hidestats').checked = bool;
    if ($q('.online-list')) $q('.online-list').style.display = sty;
    if ($q('.statistics')) $q('.statistics').style.display = sty;
    if ($q('.permissions')) $q('.permissions').style.display = sty;
  }

  function ViewHideBoards(bool) {
    for (var i = 0, elm = $('.boardCB'); i < elm.length; i++) {
      if (elm[i].checked === false) {
        if (bool) elm[i].parentNode.style.display = 'none';
        else {
          elm[i].parentNode.style.display = 'block';
          elm[i].parentNode.childNodes[2].lastElementChild.style.display = 'none';
  } } } }

  if (!GM_getValue('hidestats')) GM_setValue('hidestats', false);
  if (!GM_getValue('hidefooter')) GM_setValue('hidefooter', false);
  if (!GM_getValue('Board1')) GM_setValue('Board1', false);
  if (!GM_getValue('Board2')) GM_setValue('Board2', false);
  if (!GM_getValue('Board3')) GM_setValue('Board3', false);
  if (!GM_getValue('Board4')) GM_setValue('Board4', false);
  if (!GM_getValue('Board5')) GM_setValue('Board5', false);
  if (!GM_getValue('Board6')) GM_setValue('Board6', false);
  if (!GM_getValue('Board7')) GM_setValue('Board7', false);
  if (!GM_getValue('Board8')) GM_setValue('Board8', false);
  if (!GM_getValue('Board9')) GM_setValue('Board9', false);
  if (!GM_getValue('Board10')) GM_setValue('Board10', false);

  $q('A[href="//www.palemoon.org/"][target="_blank"][style="color:#ffff80;"]').style.display = 'none';
  $q('A[href="//www.palemoon.org/"][style="color:#ffff80;"]').innerHTML = linkHomePage.toUpperCase();
  $q('A[href="//www.palemoon.org/"][target="_blank"][style="color: rgb(255, 255, 128); display: none;"]').nextSibling.nodeValue = '';

  SiteDescription.appendChild(NavMain);
  SiteDescriptionP.innerHTML = SiteDescriptionP.innerHTML.replace('Visit the', '').replace('Discussion forum for the Pale Moon web browser', '').replace(/\(or\s+in/, '(in');
  SiteDescriptionP.appendChild(Link0);
  SiteDescriptionP.appendChild(Label0);
  SiteDescriptionP.appendChild(Label1);
  SiteDescriptionP.appendChild(Link1);
  SiteDescriptionP.appendChild(Label2);
  SiteDescriptionP.appendChild(Link2);
  SiteDescriptionP.appendChild(Label3);
  SiteDescriptionP.insertBefore(Separator, Label1);
  SiteDescriptionP.appendChild(NavBreadcrumbs);

  var nav = $q('#nav-breadcrumbs > LI:nth-child(2)'),
      hidestatsLabel = $c('label', {id: 'hidestatsLabel', textContent: hideStats}, [{type: 'click', fn: function() {HideStats(this.previousSibling)}}]),
      ckBox1 = $c('input', {id: 'hidestats', type: 'checkbox'}, [{type: 'click', fn: function() {HideStats(this)}}]),
      hidefooterLabel = $c('label', {id: 'hidefooterLabel', textContent: hideFooter}, [{type: 'click', fn: function() {HideFooter(this.previousSibling)}}]),
      ckBox2 = $c('input', {id: 'hidefooter', type: 'checkbox'}, [{type: 'click', fn: function() {HideFooter(this)}}]),
      bool1 = GM_getValue('hidestats'),
      sty1 = bool1 ? 'none' : 'block',
      bool2 = GM_getValue('hidefooter'),
      sty2 = bool2 ? 'none' : '-moz-box';
  nav.appendChild(ckBox1);
  nav.appendChild(hidestatsLabel);
  nav.appendChild(ckBox2);
  nav.appendChild(hidefooterLabel);
  $('#hidestats').checked = bool1;
  $('#hidefooter').checked = bool2;
  if ($q('.online-list')) $q('.online-list').style.display = sty1;
  if ($q('.statistics')) $q('.statistics').style.display = sty1;
  if ($q('.permissions')) $q('.permissions').style.display = sty1;
  $('#page-footer').style.display = sty2;

  for (var i = 0, utc = $q('#nav-footer > li.rightside', true); i < utc.length; i++) if (utc[i].textContent.match('All times')) utc[i].setAttribute('id', 'utc');
  $q('#utc > span').textContent = 'UTC -7';

  if (pmindex) {
    var hBoards = $c('button', {id: 'hideBoardsBtn', className: 'viewHideBtn', textContent: hideBoardsText, title: hideBoardsTip}, [{type: 'click', fn: function() {ViewHideBoards(true)}}]),
        vBoards = $c('button', {id: 'viewBoardsBtn', className: 'viewHideBtn', textContent: viewBoardsText, title: viewBoardsTip}, [{type: 'click', fn: function() {ViewHideBoards(false)}}]);
    ActionBar.insertBefore(hBoards, ActionBar.firstElementChild);
    ActionBar.insertBefore(vBoards, ActionBar.firstElementChild);
    for (var i = 0, item = $('.forabg'); i < item.length; i++) {
      var ckBox3 = $c('input', {id: 'Board'+(i+1), className: 'boardCB', type: 'checkbox'}, [{type: 'click', fn: function() {CollapseExpand(this)}}]),
          bool3 = GM_getValue('Board' + (i+1)),
          sty3 = bool3 ? 'block' : 'none';
      item[i].insertBefore(ckBox3, item[i].firstChild);
      $('#Board' + (i+1)).checked = bool3;
      item[i].setAttribute('opened', bool3);
      item[i].style.display = sty3;
      item[i].childNodes[2].lastElementChild.style.display = sty3;
    }
    DateTime.textContent = aDateTime();
    DateTime.title = dateTimeTip;
    DateTime.addEventListener('mouseover', function() {DateTime.textContent = aDateTime()}, false);
  }

  if (pmforum) {
    var announ = $q('.forumbg.announcement'),
        ckBox4 = $c('input', {id: 'Board10', className: 'boardCB', type: 'checkbox'}, [{type: 'click', fn: function() {CollapseExpand(this)}}]),
        bool4 = GM_getValue('Board10'),
        sty4 = bool4 ? 'block' : 'none';
    if (announ) {
      announ.insertBefore(ckBox4, announ.firstChild);
      $('#Board10').checked = bool4;
      announ.setAttribute('opened', bool4);
      announ.childNodes[2].lastElementChild.style.display = sty4;
  } }

  addEventListener('load', function() {timer_Interval = setInterval(function() {if (pmindex) DateTime.textContent = aDateTime()}, timerInterval)}, false);
  addEventListener('unload', function() {clearInterval(timer_Interval)}, false);

  try {
    if (IconNotification.textContent != '0') GM_addStyle('\
      ' + cssRule + ' {\
        #notification_list_button {\
          -moz-appearance: none !important;\
          background: linear-gradient(#314984, #61B0FC) !important;\
          border: 1px solid #314984 !important;\
          border-radius: 3px !important;\
          color: #FFF !important;\
          padding: 0 8px !important;\
          text-decoration: none !important;\
          text-shadow: 1px 1px 2px #000 !important;\
        }\
        #notification_list_button:hover {\
          background: linear-gradient(#61B0FC, #314984) !important;\
        }\
      }\
    ');

    if (IconPM.textContent != '0') GM_addStyle('\
      ' + cssRule + ' {\
        .icon-pm > a {\
          -moz-appearance: none !important;\
          background: linear-gradient(#006300, #00CC00) !important;\
          border: 1px solid #006300 !important;\
          border-radius: 3px !important;\
          color: #FFF !important;\
          padding: 0 8px !important;\
          text-decoration: none !important;\
          text-shadow: 1px 1px 2px #000 !important;\
        }\
        .icon-pm > a:hover {\
          background: linear-gradient(#00CC00, #006300) !important;\
        }\
      }\
    ');
  } catch(ex) {}

  if (customCheckbox) GM_addStyle('\
    ' + cssRule + ' {\
      input.boardCB {-moz-appearance: none !important; border: 1px solid #FFF !important; border-radius: 3px !important; box-shadow: inset 0 0 2px #000 !important;}\
    }\
  ');

  if (customScrollbar) GM_addStyle('\
    ' + cssRule + ' {\
      scrollbar {-moz-appearance: none !important; border-radius: 8px !important;}\
      scrollbar > slider {-moz-appearance: none !important; background: ' + scrollbarSlider + ' !important; border-width: 0 !important; border-radius: 8px !important; box-shadow: none !important;}\
      scrollbar > slider > thumb {-moz-appearance: none !important; background: ' + scrollbarThumb + ' !important; border-width: 0 !important; border-radius: 10px !important; box-shadow: inset 0 0 2px #FFF !important;}\
      scrollbar[orient="vertical"] > slider > thumb {min-height: 35px !important;}\
      scrollbar[orient="horizontal"] > slider > thumb {min-width: 35px !important;}\
      scrollbar > slider > thumb:hover, scrollbar > slider > thumb:active {background: ' + scrollbarThumbHover + ' ! important;}\
      scrollbar > scrollbarbutton {-moz-appearance: none !important; background: none !important; border: none !important;}\
      scrollbar[orient="vertical"] > scrollbarbutton {min-height: 0 !important;}\
      scrollbar[orient="horizontal"] > scrollbarbutton {min-width: 0 !important;}\
    }\
  ');

  GM_addStyle('\
    ' + cssRule + ' {\
/* BODY */\
      html {height: 100% !important;}\
      html, body {background: ' + bodyBG + ' !important;}\
/* PAGE-HEADER */\
      #page-header {-moz-user-select: none !important; height: 83px !important; position: fixed !important; top: 0 !important; width: 100% !important; z-index: 2147483647 !important;}\
      #page-header > .headerbar {background: ' + headerBG + ' !important; border: 1px solid #001752 !important; border-radius: 0 0 8px 8px !important; height: 83px !important; margin: 0 2px !important; padding: 0 !important;}\
      #page-header > .headerbar a, #hidestatsLabel, #hidefooterLabel {font-style: italic !important; font-weight: bold !important;}\
      .header, .header a {color: ' + textColor + ' !important; display: block !important; font-size: ' + fontSize + ' !important; font-weight: bold !important; position: relative !important; text-shadow: 1px 1px 2px #000 !important; top: -1px !important;}\
      .header:hover, .header:hover a {color: ' + textHoverColor + ' !important;}\
      #wrap {background: ' + bodyBG + ' !important; border: none !important; box-shadow: none !important; min-width: 100% !important; padding: 0 !important;}\
      a {border: 1px dotted transparent !important; outline: none !important;}\
      #aLink0, #aLink2 {cursor: pointer !important;}\
      #logo {padding: 6px !important;}\
      .site_logo {background: url(https://raw.githubusercontent.com/srazzano/Images/master/logo.png) !important; height: 70px !important; width: 70px !important;}\
      .headerbar h1 {margin: 6px 0 0 0 !important;}\
      #aSep {margin: 0 6px !important;}\
      .search-header {margin-top: 30px !important;}\
      .search-box button.search-icon, .search-box a.button {padding: 3px 4px 1px 2px !important;}\
      .advanced-search-link { margin: 7px 0 0 0 !important;}\
      .advanced-search-link span#aBull {display: none !important;}\
      .navbar {padding: 0 8px !important;}\
      .navbar ul.linklist {padding: 0 !important;}\
      ul.navlinks {border: none !important;}\
      #nav-main {position: absolute !important; right: 12px !important; top: 0 !important;}\
      #nav-main a, #nav-main span, #viewfolder .mark {color: ' + textColor + ' !important; font-weight: bold !important; text-shadow: 1px 1px 2px #000 !important;}\
      #nav-main .dropdown *, #notification_list *, #nav-main #quick-links a, .header .list-inner.with-mark, .header .mark {color: #000 !important; text-shadow: none !important;}\
      #nav-breadcrumbs {height: 0 !important; margin: 6px 0 0 0 !important; padding: 0 !important;}\
      #nav-breadcrumbs a {color: ' + textColor + ' !important;}\
      #nav-breadcrumbs li {margin: 2px 8px 0 0 !important;}\
      #nav-breadcrumbs span {font-size: ' + fontSize + ' !important;}\
      #hidestats, #hidefooter {-moz-appearance: none !important; border: 1px solid #FFF !important; border-radius: 3px !important; box-shadow: inset 0 0 2px #000 !important; height: 17px !important; margin: -2px 0 0 4px !important; width: 17px !important;}\
      #hidestatsLabel, #hidefooterLabel {font-size: ' + fontSize + ' !important; margin: 0 !important; padding-left: 4px !important;}\
      #hidestats:hover + #hidestatsLabel, #hidefooter:hover + #hidefooterLabel, #hidestatsLabel:hover, #hidefooterLabel:hover {cursor: pointer !important; text-decoration: underline !important;}\
      .crumb span {margin-left: 4px !important;}\
      .icon-boardrules {margin-right: 50px !important;}\
      .icon.fa-bars.fa-fw {text-shadow: 1px 1px 2px #000 !important;}\
      #site-description {height: 0 !important; margin: 0 !important; padding: 0 !important; text-shadow: 1px 1px 2px #000 !important; width: 100% !important;}\
      #site-description ul.linklist li {margin: 0 5px 0 0 !important;}\
      #site-description > p {margin: 0 !important; padding: 0 !important;}\
      #site-description > p:nth-child(3) {margin: 0 !important; padding: 0 !important;}\
      #aBull {margin: 0 8px !important;}\
      .dropdown-trigger.dropdown-toggle {text-decoration: none !important;}\
      .dropdown-trigger.dropdown-toggle:hover > span {text-decoration: underline !important;}\
      #page-header, .topics, .posts, .views {cursor: default !important;}\
      #site-description br, #page-body h2, .rules, .copyright {display: none !important;}\
      //.stat-block {display: none !important;}\
      #page-body > div:nth-child(2):not(.boardrules-container) {display: none !important;}\
      #page-body > p:nth-child(2) {float: right !important;}\
      #site-description h1, #site-description p, #site-description span, #site-description a, #site-description i, #site-description span.username, #site-description #hidestatsLabel, #site-description #hidefooterLabel {color: ' + headerText + ' !important;}\
      #username_logged_in .username {color: ' + textColor + ' !important; text-shadow: 1px 1px 2px #000 !important;}\
      #username_logged_in a span {color: #000 !important; text-shadow: none !important;}\
      body.section-viewtopic #page-body > P {display: none !important;}\
/* PAGE-BODY */\
      #page-body {margin: 76px 2px 0 2px !important;}\
/* ACTION-BAR */\
      .rightside.responsive-search, .icon.fa-file-o.fa-fw.icon-red {color: ' + textColor + ' !important;}\
      p.responsive-center.time, .mark-read.rightside {background: ' + boardBG + ' !important; border: 1px solid #001752 !important; border-radius: 4px !important; box-shadow: inset 0 0 1px #FFF !important; color: ' + textColor + ' !important; float: right !important; font-size: ' + fontSize + ' !important; height: 20px !important; margin: 0 5px 0 0 !important; padding: 4px 6px 0 6px !important; position: relative !important; text-decoration: none !important; text-shadow: 1px 1px 2px #000 !important; top: 0 !important; vertical-align: top !important;}\
      #page-body > p.responsive-center.time, .mark-read.rightside:hover {background: ' + boardHoverBG + ' !important; color: ' + textColor + ' !important;}\
      #page-body > p.responsive-center.time, .row strong, .lastpost > span:last-child {cursor: default !important;}\
      #page-body > p.responsive-center.time {-moz-user-select: none !important; font-size: 115% !important; margin-right: 0 !important; text-align: center !important; width: 215px !important;}\
      .right.responsive-center.time.rightside {display: none !important;}\
      .button.button-search icon.fa-search.fa-fw, .button.button-search icon.fa-cog.fa-fw {color: #606060 !important;}\
      .action-bar.compact {margin: 0 0 4px 0 !important;}\
      .action-bar {-moz-user-select: none !important; margin: 0 0 5px 0 !important;}\
      .action-bar a {text-decoration: none !important;}\
      .action-bar > a.button {height: 24px !important;}\
      .action-bar > a.button > span, .action-bar > a.button > i {position: relative !important; top: 3px !important;}\
      .action-bar > a.button > i {color: #FFF !important;}\
      .action-bar.bar-top .search-box {padding: 0 !important;}\
      .action-bar.bar-top input#search_keywords, #add_keywords.inputbox {color: #000 !important; height: 26px !important; width: 155px !important;}\
      .action-bar.bar-top button.button.button-search {height: 26px !important;}\
      .action-bar.bar-top a.button.button-search-end {padding: 3px 4px 3px 4px !important;}\
      .action-bar .button-search-end {border: 1px solid #C7C3BF !important; margin-left: -1px !important;}\
      #keywords {width: 155px !important;}\
      a.top, .viewHideBtn, .action-bar > a.button, #ucp .panel a.mark {-moz-appearance: none !important; background: ' + boardBG + ' !important; border: 1px solid #001752 !important; border-radius: 4px !important; box-shadow: inset 0 0 1px #FFF !important; color: ' + textColor + ' !important; cursor: pointer !important; font-size: ' + fontSize + ' !important; margin: 0 5px 0 0 !important; padding: 0 6px !important; text-shadow: 1px 1px 2px #000 !important;}\
      .viewHideBtn {height: 26px !important;}\
      .mark-read.rightside {padding: 2px 6px !important;}\
      .pagination > a.mark {height: 20px !important; padding: 4px 6px 0 6px !important;}\
      .mark, .pagination > a, .advanced-search-link {background: ' + boardBG + ' !important; border: 1px solid #001752 !important; border-radius: 4px !important; box-shadow: inset 0 0 1px #FFF !important; color: ' + textColor + ' !important; font-size: ' + fontSize + ' !important; font-weight: bold !important; padding: 4px 6px !important; text-shadow: 1px 1px 2px #000 !important;}\
      #page-body p.advanced-search-link {float: left !important; margin: 0px 5px 0 0 !important; padding: 0px 6px 0 4px !important;}\
      #page-body p.advanced-search-link > a{margin-top: 3px !important; padding-bottom: 5px !important;}\
      p.advanced-search-link a, p.advanced-search-link a i {color: #FFF !important; text-decoration: none !important;}\
      .mark-read.rightside:after, .mark[data-ajax]:after, .pagination > a:after {color: ' + textColor + ' !important; content: "\u2714" !important; margin-left: 6px !important;}\
      .mark:hover, .pagination > a:hover, .advanced-search-link:hover {background: ' + boardHoverBG + ' !important;}\
      .button.button-secondary:not([class*="bbcode-"]) {-moz-appearance: none !important; background: ' + boardBG + ' !important; border: 1px solid #001752 !important; border-radius: 4px !important; box-shadow: inset 0 0 1px #FFF !important; color: ' + textColor + ' !important; padding: 3px 6px !important; text-shadow: 1px 1px 2px #000 !important;}\
      .button.button-secondary .fa-fw {color: ' + textColor + ' !important;}\
      .button.button-secondary:not([class*="bbcode-"]):hover {background: ' + boardHoverBG + ' !important;}\
      #utc:before {color: ' + textColor + ' !important; content: "\u2022" !important; font-family: monospace !important; font-size: 24px !important; margin-left: 4px !important; position: relative !important; top: 4px !important;}\
      #utc {cursor: default !important; margin: -1px 4px 2px 0 !important;}\
      .pagination a[data-ajax] {height: 20px !important; padding: 2px 6px !important;}\
      .pagination li.active span, .pagination li a:hover, .pagination li a:hover .icon, .pagination .dropdown-visible a.dropdown-trigger, .nojs .pagination .dropdown-container:hover a.dropdown-trigger {background: ' + boardBG + ' !important; border-color: #001752 !important; border-radius: 3px !important; box-shadow: inset 0 0 1px #FFF !important; color: ' + textColor + ' !important;}\
      .pagination li a:hover {background: ' + boardHoverBG + ' !important; color: ' + textColor + ' !important;}\
/* BOARDS */\
      .forabg, .forumbg {background: ' + boardHoverBG + ' !important; border: 1px solid #001752 !important; border-radius: 6px 6px 12px 12px !important; box-shadow: inset 0 0 1px #FFF !important; margin: 0 0 5px 0 !important; padding: 4px 4px 3px 4px !important; position: relative !important;}\
      .forabg:hover .header a, .forumbg:hover .header a {color: ' + textHoverColor + ' !important;}\
      .forabg[opened="false"], .forumbg[opened="false"] {background: ' + boardBG + ' !important; border-radius: 4px !important; height: 17px !important; width: 353px !important;}\
      .forabg[opened="false"] .row-item dd, .forumbg[opened="false"] .row-item dd {display: none !important;}\
      .forabg[opened="false"]:hover, .forumbg[opened="false"]:hover {background: ' + boardHoverBG + ' !important;}\
      .forabg[opened="true"], .forumbg[opened="true"] {background: ' + boardHoverBG + ' !important;}\
      .forabg[opened="false"] dt > .list-inner > a {height: 17px !important; top: -5px !important; padding: 3px 0 0 0 !important;}\
      .forabg[opened="true"] dt > .list-inner > a {height: 11px !important; top: -2px !important;}\
      .forumbg > div:nth-child(1) .header dt > div {position: relative !important; left: 20px !important;}\
      .forabg[opened="false"] .list-inner, .forumbg[opened="false"] .list-inner {width: 100% !important;}\
      input.boardCB {float: left !important; height: 17px !important; width: 17px !important; margin: -1px 5px 0 0 !important; padding: 0 !important; position: relative !important; z-index: 2 !important;}\
      .topiclist.forums {background: none !important;}\
      .forabg li:last-child, .forumbg.announcement ul > li:last-child, .topiclist.topics li:last-of-type {border-radius: 0 0 9px 9px !important;}\
      li.header dt, li.header dd {color: ' + textColor + ' !important;}\
      li.header dt, li.header dd, #nav-footer {-moz-user-select: none !important;}\
      li.header dt:hover, li.header dd:hover {color: ' + textHoverColor + ' !important;}\
      #page-body > div:nth-child(5) > div > ul:last-child > li:last-child {border-radius: 0 0 9px 9px !important;}\
      #page-body > div:nth-child(6) > div > ul:last-child > li:last-child {border-radius: 0 0 9px 9px !important;}\
      body.section-index #page-body > div:nth-child(4):hover > div > ul:first-child > li > dl > dt > div {color: ' + textHoverColor + ' !important; cursor: default !important;}\
      body.section-viewforum #page-body > div:nth-child(4):hover > div > UL:first-child > li > dl > dt > div {color: ' + textHoverColor + ' !important; cursor: default !important;}\
      body.section-viewforum #page-body > div:nth-child(5):hover > div > UL:first-child > li > dl > dt > div {color: ' + textHoverColor + ' !important; cursor: default !important;}\
      body.section-viewforum #page-body > div:nth-child(6):hover > div > UL:first-child > li > dl > dt > div {color: ' + textHoverColor + ' !important; cursor: default !important;}\
      .topiclist.forums {margin-top: -2px !important;}\
      .row-item.forum_unread .list-inner {color: #000 !important;}\
      .row:hover {background-color: #F6F4D0 !important;}\
      .sticky {background: ' + stickyBG + ' !important;}\
      .global-announce, .announce {background: ' + lockedBG + ' !important;}\
/* PAGE-FOOTER */\
      #page-footer {margin: 0 0 0 2px !important; padding: 0 !important;}\
      #page-footer .navbar {padding: 0 !important;}\
      #nav-footer {background: ' + boardBG + ' !important; border: 1px solid #001752 !important; border-radius: 4px !important; box-shadow: inset 0 0 1px #FFF !important; color: ' + textColor + ' !important; margin: 0 !important; padding: 0 6px 0 2px !important; text-shadow: 1px 1px 2px #000 !important; width: 715px !important;}\
      #nav-footer:hover {background: ' + boardHoverBG + ' !important;}\
      #nav-footer > li {height: 17px !important; padding: 0 0 6px 0 !important; position: relative !important; top: -1px !important;}\
      #nav-footer > li i {position: relative !important; top: 0 !important;}\
      #nav-footer a, #nav-footer span, #nav-footer i {color: ' + textColor + ' !important;}\
      #nav-footer li span a > span {position: relative !important; top: -1px !important;}\
      #nav-footer li > a > span {position: relative !important; top: -1px !important;}\
      .jumpbox-return {background: ' + boardBG + ' !important; border: 1px solid #001752 !important; border-radius: 4px !important; box-shadow: inset 0 0 1px #FFF !important; color: ' + textColor + ' !important; font-size: ' + fontSize + ' !important; font-weight: bold !important; margin: 0px 0 3px 0 !important; padding: 3px 6px !important; text-shadow: 1px 1px 2px #000 !important;}\
      .jumpbox-return * {color: ' + textColor + ' !important;}\
      .jumpbox-return:hover, .advanced-search-link:hover {background: ' + boardHoverBG + ' !important;}\
      #jumpbox {height: 26px !important; margin: 0 !important; padding: 2px 6px !important;}\
      #jumpbox span {text-decoration: none !important;}\
      #jumpbox > span > span {position: relative !important; top: -1px !important;}\
      .action-bar.actions-jump {margin-bottom: 2px !important;}\
      body.section-posting #nav-footer > LI:nth-child(3) {margin-top: 1px !important;}\
      .navbar {background: transparent !important;}\
      #viewfolder .header dd.mark {background: none !important; border: none !important; color: #000 !important; text-shadow: none !important; }\
      #ucp .topiclist > .header > dl a, #ucp .row-item, #ucp .mark, #ucp span {background: none !important; border: none !important; color: #000 !important; cursor: default !important; text-decoration: none !important; text-shadow: none !important;}\
      .row-item.pm_read .mark {background: none !important; border: none !important;}\
      a.top {font-weight: bold !important; padding: 5px !important; text-decoration: none !important;}\
      a.top i {color:#FFF !important;}\
      a.top:hover, .viewHideBtn:hover, .action-bar > a.button:hover, #ucp .panel a.mark:hover {background: ' + boardHoverBG + ' !important; color: ' + textHoverColor + ' !important;}\
      .stat-block > h3 {border: none !important; margin-top: 5px !important;}\
      .stat-block > h3 > a {background: ' + boardBG + ' !important; border: 1px solid #001752 !important; border-radius: 4px !important; box-shadow: inset 0 0 1px #FFF !important; color: ' + textColor + ' !important; padding: 5px 6px !important; text-decoration: none !important; text-shadow: 1px 1px 2px #000 !important;}\
      .stat-block > h3 > a:hover {background: ' + boardHoverBG + ' !important;}\
      .stat-block p {margin: 5px 10px !important;}\
      .stat-block.statistics {margin-bottom: 10px!important; margin-top: 10px!important;}\
    }\
  ');

})();
