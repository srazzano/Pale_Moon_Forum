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

  var head = $q('HEAD');
  //if (head.innerHTML.match('pycode')) return;

  const timerInterval = 10000,
        cssRule = '/* AGENT_SHEET */ @-moz-document domain("forum.palemoon.org")',
        customCheckbox = true,
        customScrollbar = true,
        bodyBG = '#F0F0F0',
        fontSize = '105%',
        headerBG = 'linear-gradient(#4D85CA, #314A85)',
        headerText = '#FFFFFF',
        boardBG = 'linear-gradient(#4D85CA, #314A85)',
        boardHoverBG = '#001752',
        lockedBG = '#EED9D9',
        lockedHoverBG = '#FFEAEA',
        rowHover = '#FFFFFF',
        stickyBG = '#EED9D9',
        stickyHoverBG = '#FFEAEA',
        textColor = '#FFFFFF',
        textHoverColor = '#FFFFFF',
        scrollbarSlider = '#001752',
        scrollbarThumb = 'linear-gradient(to right, #5BA4ED, #314A85)',
        scrollbarThumbHover = 'linear-gradient(to right, #B2D2F3, #6181C5)',
        bullet = '\u2022',
        textPaleMoon = 'Pale Moon ',
        linkAddonsSite = 'add-ons site',
        Url1 = 'https://www.palemoon.org/',
        Url2 = 'https://addons.palemoon.org/extensions/',
        textInA = ' (in ',
        linkHomePage = 'home page',
        linkNewTab = 'new tab',
        textBracket = ')',
        searchKeyword = 'Search for keywords...',
        insertField = 'Insert selected text into search field',
        clearField = 'Clear search field',
        hideStats = 'Stats',
        hideFooter = 'Footer',
        viewBoardsText = 'View All Boards',
        viewBoardsTip = 'View All Unchecked Boards',
        hideBoardsText = 'Hide Unchecked Boards',
        hideBoardsTip = 'Hide All Unchecked Boards',
        dateTimeTip = 'Current Local Time',
        Weekday = 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday',
        WeekdayAbbr = 'Sun.,Mon.,Tue.,Wed.,Thu.,Fri.,Sat.',
        Month = 'January,February,March,April,May,June,July,August,September,October,November,December',
        MonthAbbr = 'Jan.,Feb.,Mar.,Apr.,May,Jun.,Jul.,Aug.,Sep.,Oct.,Nov.,Dec.',
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
        wd = date.getDay(),
        mth = date.getMonth(),
        dy = date.getDate(),
        yr = date.getFullYear(),
        hr = date.getHours(),
        min = date.getMinutes(),
        sec = date.getSeconds(),
        weekdaylong = Weekday.split(','),
        weekdayabbr = WeekdayAbbr.split(','),
        monthlong = Month.split(','),
        monthabbr = MonthAbbr.split(','),
        monthnum = MonthNo.split(','),
        daynum = DayNo.split(','),
        dayord = DayOrd.split(','),
        ww = weekdayabbr[wd] + ' ',
        wwww = weekdaylong[wd] + ', ',
        m = monthnum[mth] + ' ',
        mm = monthabbr[mth] + ' ',
        mmmm = monthlong[mth] + ' ',
        dd = daynum[dy] + ', ',
        dddd = dayord[dy] + ', ',
        yy = yr - 2000,
        yyyy = yr,
        hr12, hr24, ampm;
    if (hr > 12) {hr12 = hr - 12; hr24 = hr} 
    else {hr12 = hr; hr24 = hr}
    if (hr < 10) {hr12 = hr; hr24 = '0' + hr}
    if (hr === 0) {hr12 = 12; hr24 = '00'}
    hr < 12 ? ampm = ' AM' : ampm = ' PM';
    min < 10 ? min = ':0' + min : min = ':' + min;
    sec < 10 ? sec = ':0' + sec : sec = ':' + sec;
    // OPTIONS: (ww / wwww) + bullet + (m / mm / mmmm) + (dd / dddd) +  (yy / yyyy) + bullet + (hr12 / hr24) + (min) + (sec) + (ampm)
    return ww + '\u2022\u2004' + mm + dd + yyyy + '\u2004\u2022\u2005' + hr12 + min + ampm;
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
    var bool = GM_getValue(e.id) !== false ? false : true;
    GM_setValue(e.id, bool);
    $('#hidefooter').checked = bool;
    if (bool) $('#page-footer').removeAttribute('hide-footer');
    else $('#page-footer').setAttribute('hide-footer', true);
  }

  function HideStats(e) {
    var bool = GM_getValue(e.id) !== false ? false : true;
    GM_setValue(e.id, bool);
    $('#hidestats').checked = bool;
    if (bool) $('#page-body').removeAttribute('hide-stats');
    else $('#page-body').setAttribute('hide-stats', true);
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

  try {
    SiteDescriptionP.innerHTML = SiteDescriptionP.innerHTML.replace('Visit the', '').replace('Discussion forum for the Pale Moon web browser', '').replace(/\(or\s+in/, '(in').replace(/\sa\s/g, ' ');
    $('#keywords').placeholder = searchKeyword;
    $q('A[href="//www.palemoon.org/"][target="_blank"][style="color:#ffff80;"]').style.display = 'none';
    $q('A[href="//www.palemoon.org/"][style="color:#ffff80;"]').innerHTML = linkHomePage.toUpperCase();
    $q('A[href="//www.palemoon.org/"][target="_blank"][style="color: rgb(255, 255, 128); display: none;"]').nextSibling.nodeValue = '';
    SiteDescription.appendChild(NavMain);
    SiteDescriptionP.appendChild(Link0);
    SiteDescriptionP.appendChild(Label0);
    SiteDescriptionP.appendChild(Label1);
    SiteDescriptionP.appendChild(Link1);
    SiteDescriptionP.appendChild(Label2);
    SiteDescriptionP.appendChild(Link2);
    SiteDescriptionP.appendChild(Label3);
    SiteDescriptionP.insertBefore(Separator, Label1);
    SiteDescriptionP.appendChild(NavBreadcrumbs);
  } catch(ex) {}

  var dt = $c('span', {id: 'date-time'}),
      sd = $q('#site-description > H1');
  sd.appendChild(dt);
  dt.textContent = aDateTime();
  dt.title = dateTimeTip;
  dt.addEventListener('mouseover', function() {dt.textContent = aDateTime()}, false);

  var nav = $('#nav-main'),
      spn = $c('span', {id: 'stats-footer'}),
      ckBox1 = $c('input', {id: 'hidestats', type: 'checkbox'}, [{type: 'click', fn: function() {HideStats(this)}}]),
      hidestatsLabel = $c('label', {id: 'hidestatsLabel', textContent: hideStats}, [{type: 'click', fn: function() {HideStats(this.previousSibling)}}]),
      ckBox2 = $c('input', {id: 'hidefooter', type: 'checkbox'}, [{type: 'click', fn: function() {HideFooter(this)}}]),
      hidefooterLabel = $c('label', {id: 'hidefooterLabel', textContent: hideFooter}, [{type: 'click', fn: function() {HideFooter(this.previousSibling)}}]),
      bool1 = GM_getValue('hidestats'),
      bool2 = GM_getValue('hidefooter');
  spn.appendChild(ckBox1);
  spn.appendChild(hidestatsLabel);
  spn.appendChild(ckBox2);
  spn.appendChild(hidefooterLabel);
  nav.insertBefore(spn, nav.firstChild);
  $('#hidestats').checked = bool1;
  $('#hidefooter').checked = bool2;
  if (bool1) $('#page-body').removeAttribute('hide-stats');
  else $('#page-body').setAttribute('hide-stats', true);
  if (bool2) $('#page-footer').removeAttribute('hide-footer');
  else $('#page-footer').setAttribute('hide-footer', true);

  try {
    var drop = $q('#quick-links .dropdown-contents'),
        faq = $q('#nav-main > LI:nth-child(3)'),
        rule = $q('#nav-main > LI:nth-child(4)'),
        pm = $q('#nav-main > LI:nth-child(6)'),
        sep = $c('LI', {id: 'separator'});
    drop.insertBefore(pm, drop.childNodes[15]);
    drop.appendChild(rule);
    drop.appendChild(faq);
    drop.insertBefore(sep, drop.childNodes[15]);
  } catch(ex) {}

  try {
    var srch = $('#search-box'),
        clr = $c('button', {id: 'clearBtn', className: 'clearBtn', title: clearField}, [{type: 'click', fn: function() {$('#keywords').value = ''}}]),
        inst = $c('button', {id: 'insertBtn', className: 'insertBtn', title: insertField}, [{type: 'click', fn: function() {$('#keywords').value = getSelection()}}]);
    srch.insertBefore(clr, srch.firstChild);
    srch.insertBefore(inst, srch.firstChild);
  } catch(ex) {}

  try {
    for (var i = 0, utc = $q('#nav-footer > LI.rightside', true); i < utc.length; i++) if (utc[i].textContent.match('All times')) utc[i].setAttribute('id', 'utc');
    var ut = $q('#utc > span');
    ut.textContent = ut.textContent.replace('-0', ' -').replace('-1', ' -1').replace(':00', '');
  } catch(ex) {}

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
  } }

  if (pmforum) {
    try {
      var announ = $q('.forumbg.announcement'),
          ckBox4 = $c('input', {id: 'Board10', className: 'boardCB', type: 'checkbox'}, [{type: 'click', fn: function() {CollapseExpand(this)}}]),
          bool4 = GM_getValue('Board10'),
          sty4 = bool4 ? 'block' : 'none';
      if (announ) {
        announ.insertBefore(ckBox4, announ.firstChild);
        $('#Board10').checked = bool4;
        announ.setAttribute('opened', bool4);
        announ.childNodes[2].lastElementChild.style.display = sty4;
      }
    } catch(ex) {}
    try {
      var lock = $q('.forumbg dt', true);
      for (var i = 0; i < lock.length; i++) {
        if (lock[i].title.match('This topic is locked')) lock[i].parentNode.parentNode.setAttribute('locked', true);
        else lock[i].parentNode.parentNode.removeAttribute('locked');
      }
    } catch(ex) {}
  }

  if (pmsearch || pmforum || pmtopic) {
    try {
      var srch = $q('#page-body .search-box'),
          inst = $c('button', {id: 'insertBtn2', className: 'insertBtn', title: insertField}, [{type: 'click', fn: function() {pmsearch ? $('#add_keywords').value = getSelection() : $('#search_keywords').value = getSelection()}}]),
          clr = $c('button', {id: 'clearBtn2', className: 'clearBtn', title: clearField}, [{type: 'click', fn: function() {pmsearch ? $('#add_keywords').value = '' : $('#search_keywords').value = ''}}]);
      srch.insertBefore(clr, srch.firstChild);
      srch.insertBefore(inst, srch.firstChild);
    } catch(ex) {}
  }

  try {
    var stat1 = $q('.stat-block.online-list'),
        stat2 = $q('.stat-block.statistics'),
        stat3 = $q('.stat-block.permissions');
    if (stat3) stat1.appendChild(stat3);
    if (stat2) stat1.appendChild(stat2);
  } catch(ex) {}

  addEventListener('load', function() {timer_Interval = setInterval(function() {dt.textContent = aDateTime()}, timerInterval)}, false);
  addEventListener('unload', function() {clearInterval(timer_Interval)}, false);

  try {
    if (IconNotification.textContent != '0') GM_addStyle('\
      ' + cssRule + ' {\
        #notification_list_button {\
          -moz-appearance: none !important;\
          background: linear-gradient(#314984, #61B0FC) !important;\
          border: 1px solid #314984 !important;\
          border-radius: 4px !important;\
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
          border-radius: 4px !important;\
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

  if (customScrollbar && !head.innerHTML.match('pycode')) {
    GM_addStyle('\
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
  }

  if (customScrollbar && head.innerHTML.match('pycode')) {
    GM_addStyle('\
      ' + cssRule + ' {\
        scrollbar {-moz-appearance: none !important; background: #000 !important;}\
        scrollbar > slider {-moz-appearance: none !important; background: rgba(0, 0, 0, .3) !important; border-width: 0 !important; border-radius: 8px !important; box-shadow: inset 0 0 1px 1px rgba(0, 0, 0, .3), inset 3px 3px 3px 3px rgba(0, 0, 0, .3), inset -3px -3px 6px 3px hsla(0, 0%, 70%, 0.70) !important;}\
        scrollbar > slider > thumb {-moz-appearance: none !important; background-color: rgba(0, 0, 0, .8) !important; border-width: 0 !important; border-radius: 10px !important; box-shadow: inset 0 0 1px 1px rgba(0, 0, 0, .3), inset -3px -3px 3px 3px rgba(0, 0, 0, .3), inset 5px 5px 5px 5px hsla(0, 0%, 90%, 0.80) !important;}\
        scrollbar[orient="vertical"] > slider > thumb {min-height: 35px !important;}\
        scrollbar[orient="horizontal"] > slider > thumb {min-width: 35px !important;}\
        scrollbar > slider > thumb:hover, scrollbar > slider > thumb:active {box-shadow: inset 0 0 1px 0 rgba(255, 255, 255, .2), inset 0 0 2px 2px rgba(0, 0, 0, .2), inset -3px -3px 3px 3px rgba(0, 0, 0, .5), inset 5px 5px 6px 6px hsla(0, 0%, 100%, 0.90) !important;}\
        scrollbar > scrollbarbutton {-moz-appearance: none !important; background: none !important; border: none !important;}\
        scrollbar[orient="vertical"] > scrollbarbutton {min-height: 0 !important;}\
        scrollbar[orient="horizontal"] > scrollbarbutton {min-width: 0 !important;}\
        scrollbar[orient="vertical"] {padding-left: 0 !important;}\
        scrollbar[orient="horizontal"] {padding-top: 0 !important;}\
      }\
    ');
  }
  
  if (!head.innerHTML.match('pycode')) {
    GM_addStyle('\
      ' + cssRule + ' {\
/* BODY */\
      html {height: 100% !important;}\
      html, body {background: ' + bodyBG + ' !important;}\
/* PAGE-HEADER */\
      #page-header {-moz-user-select: none !important; position: fixed !important; top: 0 !important; width: 100% !important; z-index: 2147483646 !important;}\
      #page-header > .headerbar {background: ' + headerBG + ' !important; border: 1px solid #001752 !important; border-radius: 0 0 8px 8px !important; height: 83px !important; margin: 0 2px !important; padding: 0 !important;}\
      #page-header > .headerbar a, #hidestatsLabel, #hidefooterLabel {font-style: italic !important; font-weight: bold !important;}\
      #site-description h1, #site-description p, #site-description span, #site-description a, #site-description i, #site-description span.username, #stats-footer > label, ul#nav-main span {color: ' + headerText + ' !important;}\
      #date-time {font-size: 70% !important; margin-left: 10px !important;}\
      .header, .header a {color: ' + textColor + ' !important; display: block !important; font-size: ' + fontSize + ' !important; font-weight: bold !important; position: relative !important; text-shadow: 1px 1px 2px #000 !important; top: -1px !important;}\
      .header:hover, .header:hover a {color: ' + textHoverColor + ' !important;}\
      #wrap {background: ' + bodyBG + ' !important; border: none !important; box-shadow: none !important; min-width: 100% !important; padding: 0 !important;}\
      a {border: 1px dotted transparent !important; outline: none !important;}\
      #aLink0, #aLink2 {cursor: pointer !important;}\
      #logo {padding: 6px 4px 6px 2px !important; position: relative !important; z-index: 2147483647 !important;}\
      .site_logo {background: url(https://raw.githubusercontent.com/srazzano/Images/master/logo.png) !important; height: 70px !important; width: 70px !important;}\
      .headerbar h1 {margin: 6px 0 0 0 !important;}\
      #aSep {margin: 0 6px !important;}\
      .insertBtn {-moz-appearance: none !important; background: url(https://raw.githubusercontent.com/srazzano/Images/master/insert.png) no-repeat center, linear-gradient(#FFFFFF, #E9E9E9) !important; border-right: 1px solid #C7C3BF !important; border-radius: 4px 0 0 4px !important; box-shadow: 0 0 0 1px #FFF inset !important; filter: grayscale(1) !important; float: left !important; height: 24px !important; width: 29px !important;}\
      .insertBtn:hover {background: url(https://raw.githubusercontent.com/srazzano/Images/master/insert.png) no-repeat center, linear-gradient(#E9E9E9, #FFFFFF) !important; filter: none !important;}\
      .clearBtn {-moz-appearance: none !important; background: url(https://raw.githubusercontent.com/srazzano/Images/master/clear.png) no-repeat center, linear-gradient(#FFFFFF, #E9E9E9) !important; border-right: 1px solid #C7C3BF !important; border-radius: 0 !important; box-shadow: 0 0 0 1px #FFF inset !important; filter: grayscale(1) !important; float: left !important; height: 24px !important; width: 29px !important;}\
      .clearBtn:hover {background: url(https://raw.githubusercontent.com/srazzano/Images/master/clear.png) no-repeat center, linear-gradient(#E9E9E9, #FFFFFF) !important; filter: none !important;}\
      #page-body .insertBtn {border: 1px solid #C7C3BF !important; height: 26px !important;}\
      #page-body .clearBtn {border: 1px solid #C7C3BF !important; border-left: none !important; border-right: none !important; height: 26px !important;}\
      #search-box {border: 1px solid #001752 !important; box-shadow: none !important; float: right !important; margin: -58px 3px 0 0 !important; width: 298px !important;}\
      .search-box {width: 301px !important;}\
      #keywords, #add_keywords {border-radius: 0 !important; width: 181px !important;}\
      #search_keywords, #add_keywords {border-radius: 0 !important; color: #000 !important; height: 26px !important; width: 181px !important;}\
      .search-header {margin-top: 30px !important;}\
      .search-box button.search-icon, .search-box a.button {padding: 3px 4px 1px 2px !important;}\
      .advanced-search-link { margin: 7px 0 0 0 !important;}\
      .advanced-search-link span#aBull {display: none !important;}\
      ul.navlinks {border: none !important;}\
      #nav-main {position: absolute !important; right: 4px !important; top: 0 !important;}\
      #nav-main a, #nav-main span, #viewfolder .mark {color: ' + textColor + ' !important; font-weight: bold !important; text-shadow: 1px 1px 2px #000 !important;}\
      #nav-main .dropdown *, #notification_list *, #nav-main #quick-links a, .header .list-inner.with-mark, .header .mark {color: #000 !important; text-shadow: none !important;}\
      #nav-breadcrumbs {height: 0 !important; margin: 7px 0 0 0 !important; padding: 0 !important;}\
      #nav-breadcrumbs a {color: ' + textColor + ' !important;}\
      #nav-breadcrumbs li {margin: 2px 8px 0 0 !important;}\
      #nav-breadcrumbs span {font-size: ' + fontSize + ' !important;}\
      #hidefooter, #hidestats {-moz-appearance: none !important; border: 1px solid #FFF !important; border-radius: 3px !important; box-shadow: inset 0 0 2px #000 !important; height: 17px !important; margin: 6px 0 0 0 !important; width: 17px !important;}\
      #hidefooterLabel, #hidestatsLabel {color: ' + textColor + ' !important; font-size: ' + fontSize + ' !important; margin: 7px 4px 0 0 !important; padding-left: 4px !important; text-shadow: 1px 1px 2px #000 !important;}\
      #hidefooter, #hidefooterLabel, #hidestats, #hidestatsLabel {float: left !important;}\
      #hidefooterLabel {margin-right: 0 !important;}\
      #hidefooter:hover + #hidefooterLabel, #hidefooterLabel:hover, #hidestats:hover + #hidestatsLabel, #hidestatsLabel:hover {cursor: pointer !important; text-decoration: underline !important;}\
      .crumb span {margin-left: 4px !important;}\
      .icon-boardrules {margin-right: 50px !important;}\
      .icon.fa-bars.fa-fw {text-shadow: 1px 1px 2px #000 !important;}\
      #site-description {margin: 0 !important; padding: 0 !important; text-shadow: 1px 1px 2px #000 !important; width: 100% !important;}\
      #site-description ul.linklist li {margin: 0 5px 0 0 !important;}\
      #site-description > p {margin: 0 !important; padding: 0 !important;}\
      #site-description > p:nth-child(3) {margin: 0 !important; padding: 0 !important;}\
      #aBull {margin: 0 8px !important;}\
      .dropdown-trigger.dropdown-toggle {text-decoration: none !important;}\
      .dropdown-trigger.dropdown-toggle:hover > span {text-decoration: underline !important;}\
      #page-header, .topics, .posts, .views {cursor: default !important;}\
      #site-description br, #page-body h2, .rules, .copyright {display: none !important;}\
      body.section-viewforum #page-body > div:nth-child(2) > P {display: none !important;}\
      #username_logged_in .username {color: ' + textColor + ' !important; text-shadow: 1px 1px 2px #000 !important;}\
      #username_logged_in a span {color: #000 !important; text-shadow: none !important;}\
      body.section-viewtopic #page-body > P {display: none !important;}\
      #quick-links LI {border: none !important;}\
      #page-header .dropdown li#separator {border-bottom: 1px solid #000 !important;}\
/* PAGE-BODY */\
      #page-body {margin: 76px 2px 0 2px !important;}\
/* ACTION-BAR */\
      .rightside.responsive-search {display: none !important;}\
      .icon.fa-file-o.fa-fw.icon-red {color: ' + textColor + ' !important;}\
      .mark-read.rightside {background: ' + boardBG + ' !important; border: 1px solid #001752 !important; border-radius: 4px !important; box-shadow: inset 0 0 1px #FFF !important; color: ' + textColor + ' !important; float: right !important; font-size: ' + fontSize + ' !important; height: 20px !important; margin: 0 !important; padding: 4px 6px 0 6px !important; text-decoration: none !important; text-shadow: 1px 1px 2px #000 !important; }\
      .mark-read.rightside:hover {background: ' + boardHoverBG + ' !important; color: ' + textColor + ' !important;}\
      .row strong, .lastpost > span:last-child {cursor: default !important;}\
      #page-body > p {display: none !important;}\
      .button.button-search icon.fa-search.fa-fw, .button.button-search icon.fa-cog.fa-fw {color: #606060 !important;}\
      .action-bar {-moz-user-select: none !important; margin: 0 0 5px 0 !important;}\
      .action-bar a {text-decoration: none !important;}\
      .action-bar > a.button {height: 24px !important;}\
      .action-bar > a.button > span, .action-bar > a.button > i {position: relative !important; top: 3px !important;}\
      .action-bar > a.button > i {color: #FFF !important;}\
      .action-bar.bar-top button.button.button-search {height: 26px !important;}\
      .action-bar.bar-top a.button.button-search-end {padding: 3px 4px 3px 4px !important;}\
      #page-header .button.button-search {border: none !important; border-left: 1px solid #C7C3BF !important; padding: 2px 5px 4px 5px !important;}\
      #page-header .button.button-search-end {border: none !important; border-left: 1px solid #C7C3BF !important; height: 20px !important; width: 23px !important;}\
      .action-bar .button-search-end {border: 1px solid #C7C3BF !important; margin-left: -1px !important;}\
      a.top, .viewHideBtn, .action-bar > a.button, #ucp .panel a.mark {-moz-appearance: none !important; background: ' + boardBG + ' !important; border: 1px solid #001752 !important; border-radius: 4px !important; box-shadow: inset 0 0 1px #FFF !important; color: ' + textColor + ' !important; cursor: pointer !important; font-size: ' + fontSize + ' !important; margin: 0 5px 0 0 !important; padding: 0 6px !important; text-shadow: 1px 1px 2px #000 !important;}\
      .viewHideBtn {height: 26px !important;}\
      .mark-read.rightside {padding: 4px 6px 0 6px !important;}\
      .mark, .pagination > a, .advanced-search-link {background: ' + boardBG + ' !important; border: 1px solid #001752 !important; border-radius: 4px !important; box-shadow: inset 0 0 1px #FFF !important; color: ' + textColor + ' !important; font-size: ' + fontSize + ' !important; font-weight: bold !important; padding: 4px 6px !important; text-shadow: 1px 1px 2px #000 !important;}\
      .mark-read.rightside:after, .mark[data-ajax]:after, .pagination > a:after {color: ' + textColor + ' !important; content: "\u2714" !important; margin-left: 6px !important;}\
      .button.button-secondary:not([class*="bbcode-"]) {-moz-appearance: none !important; background: ' + boardBG + ' !important; border: 1px solid #001752 !important; border-radius: 4px !important; box-shadow: inset 0 0 1px #FFF !important; color: ' + textColor + ' !important; padding: 3px 6px !important; text-shadow: 1px 1px 2px #000 !important;}\
      .button.button-secondary .fa-fw {color: ' + textColor + ' !important;}\
      .button.button-secondary:not([class*="bbcode-"]):hover {background: ' + boardHoverBG + ' !important;}\
      .pagination li.active span, .pagination li a:hover, .pagination li a:hover .icon, .pagination .dropdown-visible a.dropdown-trigger, .nojs .pagination .dropdown-container:hover a.dropdown-trigger {background: ' + boardBG + ' !important; border-color: #001752 !important; border-radius: 4px !important; box-shadow: inset 0 0 1px #FFF !important; color: ' + textColor + ' !important;}\
      .pagination li.active span {background: ' + boardHoverBG + ' !important; cursor: default !important;}\
      .pagination li a:hover {background: ' + boardBG + ' !important; color: ' + textColor + ' !important;}\
      .pagination > a {padding: 5px 6px !important; margin-bottom: 2px !important;}\
      .pagination > a.mark, .pagination > a.mark-read, .action-bar.bar-bottom .pagination a[data-ajax] {height: 21px !important; padding: 3px 6px 0 6px !important;}\
      .mark:hover, .pagination > a:hover, .advanced-search-link:hover {background: ' + boardHoverBG + ' !important;}\
      .action-bar.bar-top .pagination {margin-bottom: -2px !important;}\
/* BOARDS */\
      .forabg a:hover {text-decoration: underline !important;}\
      .forabg, .forumbg {background: ' + boardHoverBG + ' !important; border: 1px solid #001752 !important; border-radius: 6px 6px 12px 12px !important; box-shadow: inset 0 0 1px #FFF !important; margin: 0 0 5px 0 !important; padding: 4px 4px 3px 4px !important; position: relative !important;}\
      .forabg:hover .header a, .forumbg:hover .header a {color: ' + textHoverColor + ' !important;}\
      .forabg[opened="false"], .forumbg[opened="false"] {background: ' + boardBG + ' !important; border-radius: 4px !important; height: 17px !important; width: 310px !important;}\
      .forabg[opened="false"] .row-item dd, .forumbg[opened="false"] .row-item dd {display: none !important;}\
      .forabg[opened="false"]:hover, .forumbg[opened="false"]:hover {background: ' + boardHoverBG + ' !important;}\
      .forabg[opened="true"], .forumbg[opened="true"] {background: ' + boardHoverBG + ' !important;}\
      .forabg[opened="false"] dt > .list-inner > a {height: 17px !important; top: -4px !important; padding: 3px 0 0 0 !important;}\
      .forabg[opened="true"] dt > .list-inner > a {height: 11px !important; top: -1px !important;}\
      .forumbg > div:nth-child(1) .header dt > div {position: relative !important; left: 20px !important;}\
      .forabg[opened="false"] .list-inner, .forumbg[opened="false"] .list-inner {width: 100% !important;}\
      input.boardCB {float: left !important; height: 17px !important; width: 17px !important; margin: -1px 5px 0 0 !important; padding: 0 !important; position: relative !important; z-index: 2 !important;}\
      .forumbg.forumbg-table {border: 2px solid #001752 !important; box-shadow: none !important;}\
      #team > TBODY tr, #team > TBODY tr td {border: none !important;}\
      #team > TBODY tr:last-child {border-radius: 0 0 9px 9px !important;}\
      .topiclist.forums {background: none !important;}\
      .forabg li:last-child, .forumbg.announcement ul > li:last-child, .topiclist.topics li:last-of-type {border-radius: 0 0 9px 9px !important;}\
      li.header dt, li.header dd {color: ' + textColor + ' !important;}\
      li.header dt, li.header dd, #nav-footer {-moz-user-select: none !important;}\
      li.header dt:hover, li.header dd:hover {color: ' + textHoverColor + ' !important;}\
      li.row dl {margin: 0 !important;}\
      #page-body > div:nth-child(5) > div > ul:last-child > li:last-child {border-radius: 0 0 9px 9px !important;}\
      #page-body > div:nth-child(6) > div > ul:last-child > li:last-child {border-radius: 0 0 9px 9px !important;}\
      body.section-index #page-body > div:nth-child(4):hover > div > ul:first-child > li > dl > dt > div {color: ' + textHoverColor + ' !important; cursor: default !important;}\
      body.section-viewforum #page-body > div:nth-child(4):hover > div > UL:first-child > li > dl > dt > div {color: ' + textHoverColor + ' !important; cursor: default !important;}\
      body.section-viewforum #page-body > div:nth-child(5):hover > div > UL:first-child > li > dl > dt > div {color: ' + textHoverColor + ' !important; cursor: default !important;}\
      body.section-viewforum #page-body > div:nth-child(6):hover > div > UL:first-child > li > dl > dt > div {color: ' + textHoverColor + ' !important; cursor: default !important;}\
      .topiclist.forums {margin-top: -2px !important;}\
      .row-item.forum_unread .list-inner {color: #000 !important;}\
      .row:hover {background-color: ' + rowHover + ' !important;}\
      .forumbg li[locked] {background: ' + lockedBG + ' !important;}\
      .forumbg li[locked]:hover {background: ' + lockedHoverBG + ' !important;}\
/* PAGE-FOOTER */\
      #page-body .stat-block {display: block !important;}\
      #page-body[hide-stats] .stat-block {display: none !important;}\
      .stat-block.online-list {border: 5px solid #001752 !important; border-radius: 6px 6px 12px 12px !important; margin-bottom: 5px !important; padding: 0 !important; width: 800px !important;}\
      .stat-block.online-list > h3 {background: ' + boardHoverBG + ' !important; border: none !important; margin: -5px 0 0 0 !important;padding: 5px 6px !important; text-decoration: none !important; text-shadow: 1px 1px 2px #000 !important;}\
      .stat-block.online-list > h3 > a {color: ' + textColor + ' !important; display: block !important;}\
      .stat-block.online-list > h3 > a:after {content: " ?" !important;}\
      .stat-block.online-list p, .stat-block.statistics p {color: #000 !important; margin: 4px 8px !important;}\
      .stat-block.online-list p em {margin-top: 5px !important;}\
      .stat-block.online-list p * {display: inline-block !important;}\
      .stat-block.statistics {border: none !important; border-radius: 0 !important; padding: 4px 0 4px 0 !important;}\
      .stat-block.statistics > h3 {border-bottom: 1px solid #000 !important; padding: 0 !important; margin: 0 4px !important;}\
      .stat-block.permissions > h3 {border: none !important; padding: 0 !important; margin: 8px 0 -4px 4px !important;}\
      #page-body > DIV:last-child > DIV > P > STRONG * {color: #000  !important;}\
      #page-body .stat-block.online-list:hover {background: ' + rowHover + ' !important;}\
      #page-footer {display: -moz-box !important; margin: 0 0 0 2px !important; padding: 0 !important;}\
      #page-footer[hide-footer] {display: none !important;}\
      .navbar {background: transparent !important; padding: 0 !important;}\
      #nav-footer {background: ' + boardHoverBG + ' !important; border: 1px solid #001752 !important; border-radius: 4px !important; box-shadow: inset 0 0 1px #FFF !important; color: ' + textColor + ' !important; margin: 0 !important; padding: 0 4px !important; text-shadow: 1px 1px 2px #000 !important; width: 800px !important;}\
      #nav-footer > li {height: 24px !important; padding: 0 !important; margin-top: -1px !important;}\
      #utc:before {color: ' + textColor + ' !important; content: "\u2022" !important; font-family: monospace !important; font-size: 24px !important; margin-left: 4px !important; position: relative !important; top: 3px !important;}\
      #utc {cursor: default !important; margin: 0 4px 1px 0 !important; position: relative !important; top: 0 !important;}\
      #nav-footer a, #nav-footer span, #nav-footer i {color: ' + textColor + ' !important;}\
      #viewfolder > DIV:first-child > DIV > FIELDSET > DIV > a, .jumpbox-return {background: ' + boardBG + ' !important; border: 1px solid #001752 !important; border-radius: 4px !important; box-shadow: inset 0 0 1px #FFF !important; color: ' + textColor + ' !important; font-size: ' + fontSize + ' !important; font-weight: bold !important; margin: 0px 0 3px 0 !important; padding: 3px 6px 3px 4px !important; text-shadow: 1px 1px 2px #000 !important;}\
      #viewfolder > DIV:first-child > DIV > FIELDSET > DIV > a {margin: 5px 0 0 0 !important; padding: 1px 6px !important; text-decoration: none !important;}\
      body.section-viewforum .button.button-secondary.dropdown-trigger.dropdown-select.dropdown-toggle {height: 24px !important; padding: 0 6px !important;}\
      body.section-viewforum .button.button-secondary.dropdown-trigger.dropdown-select.dropdown-toggle > .icon {margin-top: 5px !important;}\
      body.section-viewforum .button.button-secondary.dropdown-trigger.dropdown-select.dropdown-toggle > span i {margin-top: 2px !important;}\
      .jumpbox-return * {color: ' + textColor + ' !important;}\
      .jumpbox-return:hover, .advanced-search-link:hover, #viewfolder > DIV:first-child > DIV > FIELDSET > DIV > a:hover {background: ' + boardHoverBG + ' !important;}\
      #jumpbox {height: 26px !important; margin: 0 !important; padding: 0 !important;}\
      body.section-viewforum #jumpbox span span {position: relative !important; top: 1px !important;}\
      body.section-viewtopic #jumpbox > span > span {position: relative !important; top: -2px !important;}\
      body.section-viewtopic #jumpbox > span > span > i {position: relative !important; top: 1px !important;}\
      .action-bar.actions-jump {margin-bottom: 2px !important;}\
      #jumpbox span {margin: -3px 0 0 0 !important; text-decoration: none !important;}\
      .section-viewforum .jumpbox-return {margin-top: -2px !important;}\
      body.section-posting #nav-footer > LI:nth-child(3) {margin-top: 1px !important;}\
      #viewfolder .header dd.mark {background: none !important; border: none !important; color: #000 !important; text-shadow: none !important; }\
      #ucp .topiclist > .header > dl a, #ucp .row-item, #ucp .mark, #ucp span {background: none !important; border: none !important; color: #000 !important; cursor: default !important; text-decoration: none !important; text-shadow: none !important;}\
      .row-item.pm_read .mark {background: none !important; border: none !important;}\
      a.top {font-weight: bold !important; padding: 5px !important; text-decoration: none !important;}\
      a.top i {color:#FFF !important;}\
      a.top:hover, .viewHideBtn:hover, .action-bar > a.button:hover, #ucp .panel a.mark:hover {background: ' + boardHoverBG + ' !important; color: ' + textHoverColor + ' !important;}\
      A[href="#faqlinks"][class="top"] {display: none !important;}\
      }\
    ');
  } else {
    GM_addStyle('\
      ' + cssRule + ' {\
      html {height: 100% !important;}\
      #page-header {-moz-user-select: none !important; position: fixed !important; top: 0 !important; width: 100% !important; z-index: 2147483646 !important;}\
      #page-header > .headerbar {height: 83px !important; margin: 0 2px !important; padding: 0 !important;}\
      #page-header > .headerbar a, #hidestatsLabel, #hidefooterLabel {font-style: italic !important; font-weight: bold !important;}\
      #page-header a, #page-header label {color: #CCC !important;}\
      #page-header a:hover, #page-header label:hover {color: #FFF !important;}\
      #site-description {background: #42474F !important; margin: 0 !important; padding: 0 !important; width: 100% !important;}\
      #date-time {font-size: 70% !important; margin-left: 10px !important;}\
      .header, .header a {display: block !important; font-size: ' + fontSize + ' !important; font-weight: bold !important; position: relative !important; top: -1px !important;}\
      #wrap {border: none !important; box-shadow: none !important; min-width: 100% !important; padding: 0 !important;}\
      a {border: 1px dotted transparent !important; outline: none !important;}\
      #aLink0, #aLink2 {cursor: pointer !important;}\
      #logo {padding: 6px 4px 6px 2px !important; position: relative !important; z-index: 2147483647 !important;}\
      .site_logo {background: url(https://raw.githubusercontent.com/srazzano/Images/master/logo.png) !important; height: 70px !important; width: 70px !important;}\
      .headerbar h1 {margin: 6px 0 0 0 !important;}\
      #aSep {margin: 0 6px !important;}\
      .insertBtn {-moz-appearance: none !important; background: #4E545C url(https://raw.githubusercontent.com/srazzano/Images/master/insert.png) no-repeat center !important; border: 1px solid #000 !important; filter: grayscale(1) !important; float: left !important; height: 26px !important; width: 29px !important;}\
      .insertBtn:hover {background: #565D67 url(https://raw.githubusercontent.com/srazzano/Images/master/insert.png) no-repeat center !important; filter: none !important;}\
      .clearBtn {-moz-appearance: none !important; background: #4E545C url(https://raw.githubusercontent.com/srazzano/Images/master/clear.png) no-repeat center !important; border-top: 1px solid #000 !important; border-bottom: 1px solid #000 !important; filter: grayscale(1) !important; float: left !important; height: 26px !important; width: 29px !important;}\
      .clearBtn:hover {background: #565D67 url(https://raw.githubusercontent.com/srazzano/Images/master/clear.png) no-repeat center !important; filter: none !important;}\
      .button.button-search {border: none !important; border-top: 1px solid #000 !important; border-bottom: 1px solid #000 !important;}\
      .button.button-search-end {border: 1px solid #000 !important; border-radius: 0 !important;}\
      #search-box {float: right !important; margin: -58px 3px 0 0 !important; width: 301px !important;}\
      .search-box {width: 301px !important;}\
      #keywords, #search_keywords, #add_keywords {border: 1px solid #000 !important; border-radius: 0 !important; height: 26px !important; width: 181px !important;}\
      .search-header {margin-top: 30px !important;}\
      .search-box button.search-icon, .search-box a.button {padding: 3px 4px 1px 2px !important;}\
      .advanced-search-link { margin: 7px 0 0 0 !important;}\
      .advanced-search-link span#aBull {display: none !important;}\
      ul.navlinks {border: none !important;}\
      #nav-main {position: absolute !important; right: 4px !important; top: 0 !important;}\
      #nav-main a, #nav-main span, #viewfolder .mark {font-weight: bold !important;}\
      #nav-breadcrumbs {height: 0 !important; margin: 7px 0 0 0 !important; padding: 0 !important;}\
      #nav-breadcrumbs li {margin: 2px 8px 0 0 !important;}\
      #nav-breadcrumbs span {font-size: ' + fontSize + ' !important;}\
      #hidefooter, #hidestats {-moz-appearance: none !important; border: 1px solid #FFF !important; border-radius: 3px !important; box-shadow: inset 0 0 2px #000 !important; height: 17px !important; margin: 6px 0 0 0 !important; width: 17px !important;}\
      #hidefooterLabel, #hidestatsLabel {font-size: ' + fontSize + ' !important; margin: 7px 4px 0 0 !important; padding-left: 4px !important;}\
      #hidefooter, #hidefooterLabel, #hidestats, #hidestatsLabel {float: left !important;}\
      #hidefooterLabel {margin-right: 0 !important;}\
      #hidefooter:hover + #hidefooterLabel, #hidefooterLabel:hover, #hidestats:hover + #hidestatsLabel, #hidestatsLabel:hover {color: #FFF !important; cursor: pointer !important; text-decoration: underline !important;}\
      .crumb span {margin-left: 4px !important;}\
      .icon-boardrules {margin-right: 50px !important;}\
      #site-description ul.linklist li {margin: 0 5px 0 0 !important;}\
      #site-description > p {margin: 0 !important; padding: 0 !important;}\
      #site-description > p:nth-child(3) {margin: 0 !important; padding: 0 !important;}\
      #aBull {margin: 0 8px !important;}\
      .dropdown-trigger.dropdown-toggle {text-decoration: none !important;}\
      .dropdown-trigger.dropdown-toggle:hover > span {text-decoration: underline !important;}\
      #page-header, .topics, .posts, .views {cursor: default !important;}\
      #site-description br, #page-body h2, .rules, .copyright {display: none !important;}\
      body.section-viewforum #page-body > div:nth-child(2) > P {display: none !important;}\
      body.section-viewtopic #page-body > P {display: none !important;}\
      #quick-links LI {border: none !important;}\
      #quick-links .dropdown-contents {min-height: 320px !important; width: 180px !important;}\
      #page-body {margin: 80px 2px 0 2px !important;}\
      .rightside.responsive-search {display: none !important;}\
      .icon.fa-file-o.fa-fw.icon-red {c}\
      .mark-read.rightside {float: right !important; font-size: ' + fontSize + ' !important; height: 20px !important; margin: 0 !important; padding: 4px 6px 0 6px !important; text-decoration: none !important;}\
      .row strong, .lastpost > span:last-child {cursor: default !important;}\
      #page-body > p {display: none !important;}\
      .action-bar {-moz-user-select: none !important; margin: 5px 0 !important;}\
      .action-bar a {text-decoration: none !important;}\
      .action-bar > a.button {height: 24px !important;}\
      .action-bar > a.button > span, .action-bar > a.button > i {position: relative !important; top: 3px !important;}\
      .action-bar.bar-top button.button.button-search {height: 26px !important;}\
      .action-bar.bar-top a.button.button-search-end {padding: 3px 4px 3px 4px !important;}\
      #page-header .button.button-search {padding: 2px 5px 4px 5px !important;}\
      #page-header .button.button-search-end {height: 20px !important; width: 23px !important;}\
      .action-bar .button-search-end {margin-left: -1px !important;}\
      a.top, .viewHideBtn, .action-bar > a.button, #ucp .panel a.mark {cursor: pointer !important; font-size: ' + fontSize + ' !important; margin: 0 5px 0 0 !important; padding: 0 6px !important; text-shadow: 1px 1px 2px #000 !important;}\
      .viewHideBtn {background-color: #4E545C !important; border-color: #202225 !important; color: #CCC !important; height: 26px !important;}\
      .mark-read.rightside {padding: 4px 6px 0 6px !important;}\
      .mark, .pagination > a, .advanced-search-link {font-size: ' + fontSize + ' !important; font-weight: bold !important; padding: 4px 6px !important;}\
      .mark-read.rightside:after, .mark[data-ajax]:after, .pagination > a:after {content: "\u2714" !important; margin-left: 6px !important;}\
      .button.button-secondary:not([class*="bbcode-"]) {padding: 3px 6px !important;}\
      .pagination li.active span, .pagination li a:hover, .pagination li a:hover .icon, .pagination .dropdown-visible a.dropdown-trigger, .nojs .pagination .dropdown-container:hover a.dropdown-trigger {}\
      .pagination li.active span {cursor: default !important;}\
      .pagination > a {padding: 5px 6px !important; margin-bottom: 2px !important;}\
      .pagination > a.mark, .pagination > a.mark-read, .action-bar.bar-bottom .pagination a[data-ajax] {height: 21px !important; padding: 3px 6px 0 6px !important;}\
      .action-bar.bar-top .pagination {margin-bottom: -2px !important;}\
      .forabg a:hover {text-decoration: underline !important;}\
      .forabg, .forumbg {margin: 0 0 5px 0 !important; padding: 4px 4px 3px 4px !important; position: relative !important;}\
      .header {background: #111 !important;}\
      li.header dt, li.header dd {color: #CCC !important;}\
      .forabg[opened="false"], .forumbg[opened="false"] {height: 17px !important; width: 310px !important;}\
      .forabg[opened="false"] .row-item dd, .forumbg[opened="false"] .row-item dd {display: none !important;}\
      .forabg[opened="false"] dt > .list-inner > a {height: 17px !important; top: -4px !important; padding: 3px 0 0 0 !important;}\
      .forabg[opened="true"] dt > .list-inner > a {height: 11px !important; top: -1px !important;}\
      .forumbg > div:nth-child(1) .header dt > div {position: relative !important; left: 20px !important;}\
      .forabg[opened="false"] .list-inner, .forumbg[opened="false"] .list-inner {width: 100% !important;}\
      input.boardCB {float: left !important; height: 17px !important; width: 17px !important; margin: -1px 5px 0 0 !important; padding: 0 !important; position: relative !important; z-index: 2 !important;}\
      #team > TBODY tr, #team > TBODY tr td {border: none !important;}\
      .topiclist.forums {background: none !important;}\
      li.header dt, li.header dd, #nav-footer {-moz-user-select: none !important;}\
      li.row dl {margin: 0 !important;}\
      body.section-index #page-body > div:nth-child(4):hover > div > ul:first-child > li > dl > dt > div {cursor: default !important;}\
      body.section-viewforum #page-body > div:nth-child(4):hover > div > UL:first-child > li > dl > dt > div {cursor: default !important;}\
      body.section-viewforum #page-body > div:nth-child(5):hover > div > UL:first-child > li > dl > dt > div {cursor: default !important;}\
      body.section-viewforum #page-body > div:nth-child(6):hover > div > UL:first-child > li > dl > dt > div {cursor: default !important;}\
      .topiclist.forums {margin-top: -2px !important;}\
      li.row:hover {background-color: #191919 !important; border-color: #444 !important;}\
      li.row:hover .list-inner, li.row:hover .list-inner .forumtitle {color: #FFF !important;}\
      #page-body .forumbg2 {padding: 0 !important;}\
      #page-body .stat-block {display: block !important;}\
      #page-body[hide-stats] .stat-block {display: none !important;}\
      .stat-block.online-list {margin-bottom: 5px !important; padding: 0 !important; width: 800px !important;}\
      .stat-block.online-list > h3 {border: none !important; margin: -5px 0 0 0 !important;padding: 5px 6px !important; text-decoration: none !important;}\
      .stat-block.online-list > h3 > a {display: block !important;}\
      .stat-block.online-list > h3 > a:after {content: " ?" !important;}\
      .stat-block.online-list p, .stat-block.statistics p {margin: 4px 8px !important;}\
      .stat-block.online-list p em {margin-top: 5px !important;}\
      .stat-block.online-list p * {display: inline-block !important;}\
      .stat-block.statistics {border: none !important; border-radius: 0 !important; padding: 4px 0 4px 0 !important;}\
      .stat-block.statistics > h3 {padding: 0 !important; margin: 0 4px !important;}\
      .stat-block.permissions > h3 {border: none !important; padding: 0 !important; margin: 8px 0 -4px 4px !important;}\
      #page-footer {display: -moz-box !important; margin: 0 0 0 2px !important; padding: 0 !important;}\
      #page-footer[hide-footer] {display: none !important;}\
      .navbar {background: transparent !important; padding: 0 !important;}\
      #nav-footer {margin: 0 !important; padding: 0 4px !important; width: 800px !important;}\
      #utc:before {content: "\u2022" !important; font-family: monospace !important; font-size: 24px !important; margin-left: 4px !important; position: relative !important; top: 3px !important;}\
      #viewfolder > DIV:first-child > DIV > FIELDSET > DIV > a, .jumpbox-return {font-size: ' + fontSize + ' !important; font-weight: bold !important; margin: 0px 0 3px 0 !important; padding: 3px 6px 3px 4px !important;}\
      #viewfolder > DIV:first-child > DIV > FIELDSET > DIV > a {margin: 5px 0 0 0 !important; padding: 1px 6px !important; text-decoration: none !important;}\
      body.section-viewforum .button.button-secondary.dropdown-trigger.dropdown-select.dropdown-toggle {height: 24px !important; padding: 0 6px !important;}\
      body.section-viewforum .button.button-secondary.dropdown-trigger.dropdown-select.dropdown-toggle > .icon {margin-top: 5px !important;}\
      body.section-viewforum .button.button-secondary.dropdown-trigger.dropdown-select.dropdown-toggle > span i {margin-top: 2px !important;}\
      #jumpbox {height: 26px !important; margin: 0 !important; padding: 0 !important;}\
      body.section-viewforum #jumpbox span span {position: relative !important; top: 1px !important;}\
      body.section-viewtopic #jumpbox > span > span {position: relative !important; top: -2px !important;}\
      body.section-viewtopic #jumpbox > span > span > i {position: relative !important; top: 1px !important;}\
      .action-bar.actions-jump {margin-bottom: 2px !important;}\
      #jumpbox span {margin: -3px 0 0 0 !important; text-decoration: none !important;}\
      .section-viewforum .jumpbox-return {margin-top: -2px !important;}\
      a.top {font-weight: bold !important; padding: 5px !important; text-decoration: none !important;}\
      a.top:hover i {color: #FFF !important;}\
      a.top:hover, .viewHideBtn:hover, .action-bar > a.button:hover, #ucp .panel a.mark:hover {color: #FFF !important;}\
      A[href="#faqlinks"][class="top"] {display: none !important;}\
      .stat-block.online-list .username-coloured {color: tan !important;}\
      .row .username-coloured, .stat-block.online-list a {color: yellow !important;}\
      }\
    ');
  }
  
})();
