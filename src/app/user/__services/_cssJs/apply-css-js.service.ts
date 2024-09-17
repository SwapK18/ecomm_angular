import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApplyCssJsService {

  constructor(@Inject(DOCUMENT) private document: Document) { }

  public applyUserStyles(p_styles: string[]) {
    let p_stylesLen = null;
    let CSSIfAlready: boolean = false;

    p_stylesLen = p_styles.length;

    for (let i = 0; i < p_stylesLen; i++) {
      const head = this.document.getElementsByTagName('head')[0];
      const style = this.document.createElement('link');
      style.href = `${p_styles[i]}`;
      style.rel = 'stylesheet';

      CSSIfAlready = this.loadCSSIfNotAlreadyLoadedForSomeReason(style.href);
      if (CSSIfAlready === false) head.appendChild(style);
    }
  }

  public loadCSSIfNotAlreadyLoadedForSomeReason(p_style: any) {
    var ss = this.document.styleSheets;
    var status: boolean = false;

    for (var i = 0, max = ss.length; i < max; i++) {
      if (ss[i].href == p_style) status = true;
    }
    return status;
  }

  public loadJSIfNotAlreadyLoadedForSomeReason(p_style: any) {
    var ss = this.document.styleSheets;
    var status: boolean = false;

    for (var i = 0, max = ss.length; i < max; i++) {
      if (ss[i].href == p_style) status = true;
    }
    return status;
  }

  public loadUserScript(p_dynScrpt: string[]) {
    var isFound: boolean = false;
    var scripts = null;
    scripts = this.document.getElementsByTagName('script');

    // const headTag = document.getElementsByTagName('head');

let modernizr = this.document.createElement('script');
        modernizr.src = 'https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js';
        modernizr.type = 'text/javascript';
        modernizr.async = false;
        document.getElementsByTagName('head')[0].appendChild(modernizr);

let sharethis = this.document.createElement('script');
        sharethis.src = '//platform-api.sharethis.com/js/sharethis.js#property=5993ef01e2587a001253a261&product=inline-share-buttons';
        sharethis.type = 'text/javascript';
        sharethis.async = false;
        document.getElementsByTagName('head')[0].appendChild(sharethis);

    for (var i = 0; i < scripts.length; i++) {
      for (var j = 0; j < p_dynScrpt.length; j++) {
        if (
          scripts[i].getAttribute('src') != null &&
          scripts[i].getAttribute('src') === p_dynScrpt[j]
        ) {
          isFound = true;
        }
      }
    }

    if (!isFound) {
      var dynamicScriptslen = p_dynScrpt.length;

      for (var i = 0; i < dynamicScriptslen; i++) {
        let node = this.document.createElement('script');
        node.src = p_dynScrpt[i];
        node.type = 'text/javascript';
        node.async = false;
        document.getElementById('scrpt')?.appendChild(node);
      }
    }

  }



}
