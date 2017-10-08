;(function(global){
  "use strict";
  var getElById=function(elid,fa){
    fa = fa || document;
    return fa.getElementById(elid);
  };
  global.ToolLib=global._={
    byId:getElById
  };
})(this);
