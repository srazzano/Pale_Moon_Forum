// ==UserScript==
// @name          Pale Moon Forum
// @version       1.0.1
// @namespace     srazzano
// @id            srazzano/Pale Moon Forum@greasespot.net
// @description   Pale Moon Forum Tweaks
// @include       https://forum.palemoon.org*
// @author        Sonny Razzano
// @icon          https://raw.githubusercontent.com/srazzano/Images/master/pmforum9.png
// @homepageURL   https://github.com/srazzano/Pale_Moon_Forum
// @downloadURL   https://raw.githubusercontent.com/srazzano/Pale_Moon_Forum/master/Pale_Moon_Forum.user.js
// @updateURL     https://raw.githubusercontent.com/srazzano/Pale_Moon_Forum/master/Pale_Moon_Forum.user.js
// @grant         none
// ==/UserScript==
 
(function() {
  init();
  function init() {
    const STORAGE_PREFIX = 'Pale_Moon_Forum-';
    addStyle = function(css) {
      var head = $('head')[0]; 
      if (!head) return; 
      var style = $c('style', {type: 'text/css', innerHTML: css}); 
      head.appendChild(style);
    }
    setValue = function(name, value) {
      switch (typeof(value)) {
        case 'string': localStorage.setItem(STORAGE_PREFIX + name, 'S]' + value); break; 
        case 'number': if (value.toString().indexOf('.') < 0) localStorage.setItem(STORAGE_PREFIX + name, 'N]' + value); break; 
        case 'boolean': localStorage.setItem(STORAGE_PREFIX + name, 'B]' + value); break;
    } }
    getValue = function(name, defValue) {
      var value = localStorage.getItem(STORAGE_PREFIX + name); 
      if (value == null) return defValue;
      else {
        switch (value.substr(0, 2)) {
          case 'S]': return value.substr(2); 
          case 'N]': return parseInt(value.substr(2)); 
          case 'B]': return value.substr(2) == 'true';
        }
      } return value;
    }
    deleteValue = function(name) {
      localStorage.removeItem(STORAGE_PREFIX + name);
  } }
 
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
      for (prop in props) {
        if (typeof node[prop] == 'undefined') node.setAttribute(prop, props[prop]);
        else node[prop] = props[prop];
    } }
    if (evls instanceof Array) {
      for (var i = 0; i < evls.length; i++) {
        var evl = evls[i];
        if (typeof evl.type == 'string' && typeof evl.fn == 'function')
          node.addEventListener(evl.type, evl.fn, false);
    } }
    return node;
  }
   
  function $n(type, props) {
    var node = document.createTextNode(type);
    if (props && typeof props == 'object') for (prop in props) node[prop] = props[prop];
    return node;
  }
 
  function $q(el) {
    return document.querySelector(el);
  }
 
  function CloseOpenAll(bool) {
    for (var i = 0, item = $('.forabg'); i < item.length; i++) {
      var blk = item[i],
          elm = blk.childNodes[2].lastElementChild, 
          val = 'Board' + (i+1),
          sty = bool ? 'block' : 'none';
      item[i].setAttribute('opened', bool);
      elm.style.display = sty;
      $('#' + val).checked = bool;
      setValue(val, bool);
  } }
 
  function CloseOpen(e) {
    var elm = e.parentNode,
        bool = getValue(e.id) !== false ? false : true,
        sty = bool ? 'block' : 'none';
    elm.setAttribute('opened', bool);
    elm.childNodes[2].lastElementChild.style.display = sty;
    setValue(e.id, bool); 
  }
  
  var fontSize = "105%";
  addStyle('\
    html {height: 100% !important;}\
    #wrap {background: none !important; border: none !important; box-shadow: none !important; min-width: 99.5% !important; margin: 0 0 0 8px !important; padding: 0 !important;}\
    #page-header {background: linear-gradient(#5BA4ED, #314A85) !important; border: 1px solid #314A85 !important; border-radius: 12px !important; height: 86px !important; left: 8px !important; position: fixed !important; top: 0 !important; width: 99.5% !important; z-index: 2147483647 !important;}\
    #page-body {margin-top: 79px !important}\
    a {border: 1px dotted transparent !important; outline: none !important;}\
    #aLink0, #aLink2 {cursor: pointer !important;}\
    .headerbar {background: transparent !important; border-radius: 12px 12px 0 0 !important; padding: 0 0 8px 0 !important}\
    .site_logo {background: url(https://raw.githubusercontent.com/srazzano/Images/master/pmforum9.png) !important; height: 64px !important; width: 64px !important;}\
    .headerbar h1 {margin: 6px 0 0 0 !important}\
    .navbar {padding: 0 8px !important}\
    .navbar ul.linklist {padding: 0 !important}\
    ul.navlinks {border: none !important}\
    .search-header {margin-top: 30px !important;}\
    .search-box button.search-icon, .search-box a.button {padding: 3px 4px 1px 2px !important;}\
    #nav-main {position: absolute !important; right: 12px !important; top: 0 !important;}\
    #nav-main a, #nav-main span{color: #FFF !important; font-weight: bold !important; text-shadow: 1px 1px 2px #000 !important;}\
    #nav-main .dropdown a, #notification_list li {color: #000 !important; text-shadow: none !important;}\
    #nav-breadcrumbs a {color: #FFF !important;}\
    #nav-breadcrumbs {height: 0 !important; margin: 6px 0 0 0 !important; padding: 0 !important;}\
    #nav-breadcrumbs li {margin: 2px 8px 0 0 !important;}\
    #nav-breadcrumbs span {font-size: ' + fontSize + ' !important;}\
    .icon-boardrules {margin-right: 50px !important;}\
    #site-description {height: 0 !important; margin: 0 !important; padding: 0 !important; text-shadow: 1px 1px 2px #000 !important; width: 100% !important;}\
    #site-description > p {margin: 0 !important; padding: 0 !important;}\
    #site-description > p:nth-child(3) {margin: 0 !important; padding: 0 !important;}\
    #page-header, .topics, .posts, .views {cursor: default !important;}\
    #site-description br, #page-body h2, .rules, .stat-block, .copyright {display: none !important;}\
    .action-bar {height: 30px !important; margin: 0 0 5px 0 !important;}\
    #page-body > DIV:nth-child(2) {display: none !important;}\
    #page-body p {color: #000 !important; position: relative !important; top: -3px !important;}\
    #page-body > .responsive-center.time {margin: 7px 0 0 0 !important; cursor: default !important;}\
    #page-body > p:nth-child(2) {float: right !important;}\
    body.section-viewtopic #page-body > P {display: none !important;}\
    #aBull {margin: 0 8px !important;}\
    .closeOpenBtn {-moz-appearance: none !important; background: linear-gradient(#5BA4ED, #314A85) !important; border: 1px solid #314A85 !important; border-radius: 4px !important; box-shadow: inset 0 0 1px #FFF !important; color: #FFF !important; cursor: pointer !important; font-size: ' + fontSize + ' !important; height: 30px !important; margin: 0 6px 0 0 !important; padding: 0 6px !important; text-shadow: 1px 1px 2px #000 !important;}\
    .closeOpenBtn:hover {background: linear-gradient(#314A85, #365491) !important;}\
    .mark-read.rightside {background: linear-gradient(#5BA4ED, #314A85) !important; border: 1px solid #314A85 !important; border-radius: 4px !important; box-shadow: inset 0 0 1px #FFF !important; color: #FFF !important; float: none !important; font-size: ' + fontSize + ' !important; height: 22px !important; margin: 0 !important; padding: 6px 6px 0px 6px !important; position: relative !important; text-decoration: none !important; text-shadow: 1px 1px 2px #000 !important; top: 0 !important; vertical-align: top !important;}\
    .mark-read.rightside:hover {background: linear-gradient(#314A85, #365491) !important;}\
    .forabg, .forumbg {background: linear-gradient(#314A85, #365491) !important; border: 1px solid #314A85 !important; border-radius: 12px !important; box-shadow: inset 0 0 1px #FFF !important; margin: 0 0 5px 0 !important; padding: 4px !important;}\
    .forabg:hover .header a, .forumbg:hover .header a {color: #FF0 !important;}\
    .forabg[opened="false"], .forumbg[opened="false"] {background: linear-gradient(#5BA4ED, #314A85) !important; border-radius: 4px !important; height: 16px !important; width: 355px !important;}\
    .forabg[opened="false"] .row-item dd, .forumbg[opened="false"] .row-item dd {display: none !important;}\
    .forabg[opened="false"]:hover, .forumbg[opened="false"]:hover {background: linear-gradient(#314A85, #365491) !important;}\
    .boardCB {float: left !important; margin: 1px 2px 0 0 !important; position: relative !important; width: 16px !important; z-index: 2 !important;}\
    .header, .header a {color: #FFF !important; display: block !important; font-size: ' + fontSize + ' !important; font-weight: bold !important; position: relative !important; text-shadow: 1px 1px 2px #000 !important; top: -1px !important;}\
    body.section-index #page-body > DIV:nth-child(4):hover > DIV > UL:first-child > LI > DL > DT > DIV {color: #FF0 !important;}\
    body.section-viewforum #page-body > DIV:nth-child(4):hover > DIV > UL:first-child > LI > DL > DT > DIV {color: #FF0 !important;}\
    body.section-viewforum #page-body > DIV:nth-child(5):hover > DIV > UL:first-child > LI > DL > DT > DIV {color: #FF0 !important;}\
    body.section-viewforum #page-body > DIV:nth-child(6):hover > DIV > UL:first-child > LI > DL > DT > DIV {color: #FF0 !important;}\
    .list-inner {width: 100% !important;}\
    #nav-footer {background: linear-gradient(#999, #222) !important; color: #FFF !important; border: 1px solid #000 !important; border-radius: 4px !important; margin-left: -8px !important; padding: 0 4px 2px 4px !important; width: 671px !important;}\
    #nav-footer:hover {background: #222 !important;}\
    #nav-footer a, #nav-footer span, #nav-footer i {color: #FFF !important;}\
    body.section-index #nav-footer > LI:nth-child(3) {margin-top: 1px !important;}\
    body.section-viewforum #nav-footer > LI:nth-child(4) {margin-top: 1px !important;}\
    body.section-posting #nav-footer > LI:nth-child(3) {margin-top: 1px !important;}\
    .navbar {background: transparent !important;}\
    .row:hover {background-color: #F6F4D0 !important;}\
    .rightside.responsive-search, .icon.fa-file-o.fa-fw.icon-red {color: #FFF !important;}\
    .button.button-search icon.fa-search.fa-fw, .button.button-search icon.fa-cog.fa-fw {color: #606060 !important;}\
    #username_logged_in .username {color: #FFF !important; text-shadow: 1px 1px 2px #000 !important;}\
    #username_logged_in a span {color: #000 !important; text-shadow: none !important;}\
  ');

  var bullet = '\u2022',
      linksSeparatorStyle = 'color: white; margin: 0 6px;',
      textPaleMoon = 'Pale Moon ',
      linkAddonsSite = 'add-ons site',
      Url1  = 'https://www.palemoon.org/',
      Url2 = 'https://addons.palemoon.org/extensions/',
      textInA = ' (in a ',
      linkNewTab = 'new tab',
      textBracket = ')',
      linkStyle = 'color: yellow;',
      labelStyle = 'color: white;',
      openBtnText = 'Open All Boards',
      closeBtnText = 'Close All Boards',
      ActionBar = $('.action-bar', $('#page-body'), 1),
      Link0 = $c('a', {id: 'aLink0', textContent: linkNewTab, style: linkStyle}, [{type: 'click', fn: function() {window.open(Url1, '_blank')}}]),
      Label0 = $n('text', {textContent: textBracket, style: labelStyle}),
      Separator = $c('span', {id: 'aSep', textContent: bullet, style: linksSeparatorStyle}),
      Label1 = $n('text', {textContent: textPaleMoon}),
      Link1 = $c('a', {id: 'aLink1', href: Url2, textContent: linkAddonsSite, style: linkStyle}),
      Label2 = $n('text', {textContent: textInA, style: labelStyle}),
      Link2 = $c('a', {id: 'aLink2', textContent: linkNewTab, style: linkStyle}, [{type: 'click', fn: function() {window.open(Url2, '_blank')}}]),
      Label3 = $n('text', {textContent: textBracket, style: labelStyle}),
      Bullet = $c('span', {id: 'aBull', textContent: bullet}),
      PageWrap = $q('#wrap'),
      PageHeader = $q('#page-header'),
      SiteDescription = $q('#site-description'),
      SiteDescriptionP = $q('#site-description > p'),
      NavMain = $q('#nav-main'),
      NavBreadcrumbs = $q('#nav-breadcrumbs'),
      IconNotification = $q('.icon-notification > a > strong'),
      IconPM = $q('.icon-pm > a > strong'),
      DateTime = $q('#page-body > p:nth-child(2)'),
      url = window.location.href.toLowerCase(),
      pmindex = url.match('https://forum.palemoon.org/index'),
      pmforum = url.match('https://forum.palemoon.org/viewforum'),
      pmtopic = url.match('https://forum.palemoon.org/viewtopic'),
      pmsearch = url.match('https://forum.palemoon.org/search'),
      pmucp = url.match('https://forum.palemoon.org/ucp');
  
  var yyy = $q('A[href="//www.palemoon.org/"][target="_blank"][style="color:#ffff80;"]');
  yyy.style.display = 'none';
  var zzz = $q('A[href="//www.palemoon.org/"][target="_blank"][style="color: rgb(255, 255, 128); display: none;"]');
  zzz.nextSibling.nodeValue = '';
  
  setTimeout(function() {
    //var doc = document.firstElementChild.clientWidth;
    //PageWrap.style.minWidth = doc - 9 + "px";
    //PageHeader.style.minWidth = doc - 9 + "px";
  }, 200);

  SiteDescription.appendChild(NavMain);
  SiteDescriptionP.innerHTML = SiteDescriptionP.innerHTML.replace('Discussion forum for the Pale Moon web browser', '').replace(/\(or\s+in/, '(in');
  SiteDescriptionP.appendChild(Link0);
  SiteDescriptionP.appendChild(Label0);
  SiteDescriptionP.appendChild(Label1);
  SiteDescriptionP.appendChild(Link1);
  SiteDescriptionP.appendChild(Label2);
  SiteDescriptionP.appendChild(Link2);
  SiteDescriptionP.appendChild(Label3);
  SiteDescriptionP.insertBefore(Separator, Label1);
  SiteDescriptionP.appendChild(NavBreadcrumbs);
  try {DateTime.appendChild(Bullet)} catch(ex) {};
   
  if (!getValue('Board1')) setValue('Board1', false);
  if (!getValue('Board2')) setValue('Board2', false);
  if (!getValue('Board3')) setValue('Board3', false);
  if (!getValue('Board4')) setValue('Board4', false);
  if (!getValue('Board5')) setValue('Board5', false);
  if (!getValue('Board6')) setValue('Board6', false);
  if (!getValue('Board7')) setValue('Board7', false);
  if (!getValue('Board8')) setValue('Board8', false);
  if (!getValue('Board9')) setValue('Board9', false);
  if (!getValue('Board10')) setValue('Board10', false);

  if (pmindex) {
    var bClose = $c('button', {id: 'close-btn', className: 'closeOpenBtn', textContent: closeBtnText}, [{type: 'click', fn: function() {CloseOpenAll(false)}}]),
        bOpen = $c('button', {id: 'open-btn', className: 'closeOpenBtn', textContent: openBtnText}, [{type: 'click', fn: function() {CloseOpenAll(true)}}]);
    ActionBar.insertBefore(bClose, ActionBar.firstElementChild);
    ActionBar.insertBefore(bOpen, ActionBar.firstElementChild);
    for (var i = 0, item = $('.forabg'); i < item.length; i++) {
      var ckBox = $c('input', {id: 'Board'+(i+1), className: 'boardCB', type: 'checkbox'}, [{type: 'click', fn: function() {CloseOpen(this)}}]),
          board = getValue('Board' + (i+1)),
          sty = board ? 'block' : 'none';
      item[i].insertBefore(ckBox, item[i].firstChild);
      $('#Board' + (i+1)).checked = board;
      item[i].setAttribute('opened', board);
      item[i].childNodes[2].lastElementChild.style.display = sty;
  } }
  
  if (pmforum) {
    var ann = $q(".forumbg.announcement"),
        ckBox = $c('input', {id: 'Board10', className: 'boardCB', type: 'checkbox'}, [{type: 'click', fn: function() {CloseOpen(this)}}]),
        board = getValue('Board10'),
        sty = board ? 'block' : 'none';
    ann.insertBefore(ckBox, ann.firstChild);
    $('#Board10').checked = board;
    ann.setAttribute('opened', board);
    ann.childNodes[2].lastElementChild.style.display = sty;
  }

  try {
    if (IconNotification.textContent != "0") addStyle('\
      #notification_list_button {\
      -moz-appearance: none !important;\
      background: linear-gradient(#314984, #61B0FC) !important;\
      border: 1px solid #314984 !important;\
      border-radius: 3px !important;\
      color: #FFF !important;\
      padding: 0 8px !important;\
      text-decoration: none !important;\
      text-shadow: 1px 1px 2px #000 !important\
      }\
      #notification_list_button:hover {\
        background: linear-gradient(#61B0FC, #314984) !important\
      }\
    ');
  } catch(ex) {}
 
  try {
  if (IconPM.textContent != "0") addStyle('\
    .icon-pm > a {\
      -moz-appearance: none !important;\
      background: linear-gradient(#006300, #00CC00) !important;\
      border: 1px solid #006300 !important;\
      border-radius: 3px !important;\
      color: #FFF !important;\
      padding: 0 8px !important;\
      text-decoration: none !important;\
      text-shadow: 1px 1px 2px #000 !important\
    }\
    .icon-pm > a:hover {\
      background: linear-gradient(#00CC00, #006300) !important\
    }\
  ');
  } catch(ex) {}

})();
