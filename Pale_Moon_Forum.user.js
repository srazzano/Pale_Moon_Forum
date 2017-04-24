// ==UserScript==
// @name          Pale Moon Forum
// @version       1.0.1
// @namespace     srazzano
// @id            srazzano/Pale Moon Forum@greasespot.net
// @description   Pale Moon Forum Tweaks
// @include       https://forum.palemoon.org*
// @author        Sonny Razzano
// @icon          https://raw.githubusercontent.com/srazzano/Images/master/pmforum.png
// @grant         none
// @run-at        document-end
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
          sty = bool !== false ? 'block' : 'none';
      item[i].setAttribute('opened', bool);
      elm.style.display = sty;
      $('#' + val).checked = bool;
      setValue(val, bool);
  } }
 
  function CloseOpen(e) {
    var elm = e.parentNode,
        bol = getValue(e.id) !== false ? false : true,
        sty = bol !== false ? 'block' : 'none';
    elm.setAttribute('opened', bol);
    elm.childNodes[2].lastElementChild.style.display = sty;
    setValue(e.id, bol); 
  }
 
  addStyle('\
    html {height: 100% !important}\
    #wrap {background: none !important; border: none !important; box-shadow: none !important; padding: 0 4px 4px 4px !important}\
    #page-header {background: linear-gradient(#61B0FC, #314984) !important; border: 1px solid #314984 !important; border-radius: 12px !important; height: 86px !important; left: 8px !important; position: fixed; top: 0; z-index: 2147483647;}\
    a {border: 1px dotted transparent !important; outline: none !important;}\
    #page-body {margin-top: 81px !important}\
    .headerbar {border-radius: 12px 12px 0 0 !important; padding: 0 0 8px 0 !important}\
    .headerbar {background: transparent !important}\
    .forabg {background: linear-gradient(#61B0FC, #314984) !important}\
    .imageset.site_logo {padding: 70px 0 0 70px !important}\
    .logo {margin: 9px !important; padding: 0 !important}\
    .headerbar h1 {margin: 6px 0 0 0 !important}\
    .navbar {padding: 0 8px !important}\
    .navbar ul.linklist {padding: 0 !important}\
    ul.navlinks {border: none !important}\
    .search-header {margin-top: 30px !important;}\
    .search-box button.search-icon, .search-box a.button {padding: 3px 4px 1px 2px !important;}\
    #nav-main {position: absolute !important; right: 12px !important; top: 0px !important}\
    #nav-main a, #nav-main span, #nav-breadcrumbs a {color: #FFF !important}\
    #nav-main .dropdown a, #notification_list li {color: #000 !important; text-shadow: none !important}\
    #nav-breadcrumbs {height: 0px !important; margin: 12px 16px 0px 0 !important; padding: 0 !important}\
    #nav-breadcrumbs span {font-size: 110% !important}\
    .icon-boardrules {margin-right: 50px !important}\
    #site-description {height: 0px !important; margin: 0 !important; padding: 0 !important; text-shadow: 1px 1px 2px #000 !important; width: 100% !important}\
    #site-description > p {margin: 0 !important; padding: 0 !important}\
    #site-description > p:nth-child(3) {margin: 0 !important; padding: 0 !important}\
    #page-header {height: 86px !important; margin: 0 !important; padding: 0 !important}\
    #page-header, .topics, .posts, .views {cursor: default !important}\
    #site-description br, #page-body h2, .rules, .stat-block, .copyright {display: none !important}\
    #page-body p {position: relative; top: -3px}\
    .action-bar.top {margin: -16px 0 4px 0 !important}\
    body.section-index .action-bar {margin: -2px 0 2px 0 !important}\
    body.section-index #page-body > .responsive-center.time {margin: 7px 0 0 0 !important; cursor: default !important}\
    body.section-index #page-body > p:nth-child(2) {float: right !important}\
    body.section-index #aBull {margin: 0 8px !important}\
    body.section-index .closeOpenBtn, body.section-index a.mark-read.rightside {-moz-appearance: none !important; background: linear-gradient(#61B0FC, #314984); border: 1px solid #314984; border-radius: 4px; box-shadow: 0 0 3px #FFF inset; color: #FFF; cursor: pointer; margin-right: 6px; padding: 2px 6px; text-shadow: 1px 1px 2px #000}\
    body.section-index .closeOpenBtn:hover, body.section-index .mark-read.rightside:hover  {background: linear-gradient(#314984, #61B0FC)}\
    body.section-index a.mark-read.rightside {float: none !important; font-size: 110% !important; margin: 0 !important; padding: 3px 6px 2px 6px !important; text-decoration: none !important}\
    body.section-index .forabg {box-shadow: 2px 2px 2px #333 !important; margin: 0 0 5px 0 !important; padding: 0 2px 4px 20px !important}\
    body.section-index .forabg[opened="false"] {padding-bottom: 0 !important}\
    body.section-index .boardCB {box-shadow: 0 0 4px #000 !important; left: -18px !important; position: relative !important; top: 1px !important}\
    body.section-index #Board1 + div {cursor: default !important}\
    .forabg .header *, .forumbg .header * {text-shadow: 1px 1px 2px #000}\
    body.section-index .forabg[opened="true"] .header *:not(dd):not(span), .forumbg .header dt .list-inner {text-shadow: 1px 1px 2px #000, -1px 1px 2px #000, 1px -1px 2px #000, -1px -1px 2px #000 !important}\
    body.section-index .forabg .header a:hover {color: #FF0 !important}\
    body.section-index .forabg[opened="true"] .header a, .forumbg .header dt .list-inner {color: #FF0 !important; font-size: 110% !important; font-weight: bold !important}\
    body.section-index #page-body > .forabg[opened="true"] > DIV > UL:first-child > LI > DL > DT > DIV {color: #FF0 !important; font-size: 110% !important; font-weight: bold !important}\
    body.section-index .forabg .inner {margin: -18px 0 0 4px !important}\
    body.section-index ul.topiclist.forums {margin: 0 4px 0 -18px !important; padding: 0 !important}\
    body.section-index .header .list-inner > a {display: block !important}\
    body.section-index .header dd {cursor: default !important}\
    body.section-index #nav-footer > li:nth-child(3) {cursor: default !important}\
    #page-body > P:nth-child(3), #page-body > DIV:nth-child(2) > P {margin: 0 !important; position: relative !important; top: 3px !important; width: 30% !important}\
    #page-body > DIV:nth-child(2) > P {left: 325px !important}\
    #page-body > P:nth-child(3)  {left: 387px !important}\
  ');
 
  var bullet = '\u2022',
      linksSeparatorStyle = 'color: white; margin: 0 6px;',
      link1Text = 'Pale Moon add-ons site',
      linkUrl = 'https://addons.palemoon.org/extensions/',
      label1Text = ' (in a ',
      link2Text = 'new tab',
      label2Text = ')',
      linkStyle = 'color: yellow;',
      labelStyle = 'color: white;',
      openBtnText = 'Open All Boards',
      closeBtnText = 'Close All Boards',
      ActionBar = $('.action-bar', $('#page-body'), 1),
      Separator = $c('span', {id: 'aSep', textContent: bullet, style: linksSeparatorStyle}),
      Link1 = $c('a', {id: 'aLink1', href: linkUrl, textContent: link1Text, style: linkStyle}),
      Label1 = $n('text', {textContent: label1Text, style: labelStyle}),
      Link2 = $c('a', {id: 'aLink2', textContent: link2Text, style: linkStyle}, [{type: 'click', fn: function() {window.open(linkUrl, '_blank')}}]);
      Label2 = $n('text', {textContent: label2Text, style: labelStyle}),
      Bullet = $c('span', {id: 'aBull', textContent: bullet}),
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
 
  setTimeout(function() {
    var doc = document.body.clientWidth;
    PageHeader.style.width = doc - 18 + "px";
  }, 20);
  
  SiteDescription.appendChild(NavMain);
  SiteDescriptionP.innerHTML = SiteDescriptionP.innerHTML.replace('Discussion forum for the Pale Moon web browser', '').replace(/\(or\s+in/, '(in');
  SiteDescriptionP.appendChild(Link1);
  SiteDescriptionP.appendChild(Label1);
  SiteDescriptionP.appendChild(Link2);
  SiteDescriptionP.appendChild(Label2);
  SiteDescriptionP.insertBefore(Separator, Link1);
  SiteDescriptionP.appendChild(NavBreadcrumbs);
  DateTime.appendChild(Bullet);
   
  if (!getValue('Board1')) setValue('Board1', false);
  if (!getValue('Board2')) setValue('Board2', false);
  if (!getValue('Board3')) setValue('Board3', false);
  if (!getValue('Board4')) setValue('Board4', false);
  if (!getValue('Board5')) setValue('Board5', false);
  if (!getValue('Board6')) setValue('Board6', false);
  if (!getValue('Board7')) setValue('Board7', false);
  if (!getValue('Board8')) setValue('Board8', false);
 
  if (pmindex) {
    var bClose = $c('button', {id: 'close-btn', className: 'closeOpenBtn', textContent: closeBtnText}, [{type: 'click', fn: function() {CloseOpenAll(false)}}]),
        bOpen = $c('button', {id: 'open-btn', className: 'closeOpenBtn', textContent: openBtnText}, [{type: 'click', fn: function() {CloseOpenAll(true)}}]);
    ActionBar.insertBefore(bClose, ActionBar.firstElementChild);
    ActionBar.insertBefore(bOpen, ActionBar.firstElementChild);
    for (var i = 0, item = $('.forabg'); i < item.length; i++) {
      var ckBox = $c('input', {id: 'Board'+(i+1), className: 'boardCB', type: 'checkbox'}, [{type: 'click', fn: function() {CloseOpen(this)}}]),
          board = getValue('Board' + (i+1)),
          array = board !== false ? 'block' : 'none';
      item[i].insertBefore(ckBox, item[i].firstChild);
      $('#Board' + (i+1)).checked = board;
      item[i].setAttribute('opened', board);
      item[i].childNodes[2].lastElementChild.style.display = array;
  } }
 
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

})();
