//
// Copyright 2015-21 Volker Sorge
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Class highlighting CSS elements.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


import {AbstractHighlighter} from './abstract_highlighter';



export class CssHighlighter extends sre.AbstractHighlighter {
  mactionName = 'mjx-maction';
  constructor() {
    super();
  }


  /**
   * @override
   */
  highlightNode(node) {
    let info = {
      node: node,
      background: node.style.backgroundColor,
      foreground: node.style.color
    };
    let color = this.colorString();
    node.style.backgroundColor = color.background;
    node.style.color = color.foreground;
    return info;
  }


  /**
   * @override
   */
  unhighlightNode(info) {
    info.node.style.backgroundColor = info.background;
    info.node.style.color = info.foreground;
  }
}
goog.inherits(CssHighlighter, AbstractHighlighter);