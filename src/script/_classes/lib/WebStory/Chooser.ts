"use strict";
import Teller = require("./Teller");
import WebStory = require("./WebStory");


/**
 * Chooser class
 * 
 * @date 22-mar-2017
 */

class Chooser extends Teller {

  constructor(story:WebStory, element:HTMLElement) {
    super(story, element);
  }

  init() {
    var element = this.element;
    for (var i=0;i<element.children.length;i++) {
      var child = element.children.item(i);
      if (child instanceof Element) {
        if (!child.getAttribute("title")) child.setAttribute("title", child.firstElementChild.textContent);
        var title = child.getAttribute("title");
        child.innerHTML = '<a href="javascript:void(0)"></a>';
        let a = child.querySelector("a");
        a.textContent = title;
        a.addEventListener("click", this._createChooseFn(child.id));
        setTimeout(()=>{ a.focus(); }, 1024+1024*Math.random());
      }
    }
    this.appendElement();
  }

  goOn() {
    this.hurry();
  }

  hurry() {
    if (this.element.getAttribute("style")) {
      this.element.classList.add("hidden");
      this.element.removeAttribute("style");
      setTimeout(()=>{ this.element.classList.remove("hidden"); }, 50);
    }
  }

  /*
    _privates
  */
  private _lastDodge=0;
  private _elementToDodge:HTMLElement;
  private _dodgeTO:any;

  private _createChooseFn(id:string) {
    var _t = this;
    return function() {
      _t.story.trackEvent(_t.element.querySelector("#"+id).getAttribute("title"));
      _t._showChoice(id);
      _t.story.newSection();
      _t.story.goTo("#"+id, _t);
      _t.story.impatience = 0;
    }
  }

  private _showChoice(id:string) {
    var _t = this;
    var p = this.element, i:number;
    var option:Element, options = p.children;
    p.classList.add("hidden");
    for (i=0;i<options.length;i++) {
      option = options.item(i);
      if (option.id === id) {
        option.classList.add("shown");
      } else {
        option.classList.add("hidden");
      }
    }
    setTimeout(function(){
      _t.removeElement();
    }, 4096);
  }

}
export = Chooser;
