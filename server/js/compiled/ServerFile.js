// Generated by CoffeeScript 1.6.2
(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.ServerFile = (function(_super) {
    __extends(ServerFile, _super);

    function ServerFile() {
      this.updateFileType = __bind(this.updateFileType, this);      _ref = ServerFile.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ServerFile.prototype.defaults = {
      name: "",
      size: 0,
      contents: "",
      type: "",
      fileType: "",
      isProductionVersion: false,
      isRequired: false,
      dateCreated: null,
      hasBeenEdited: false
    };

    ServerFile.fileTypeEnum = {
      HTML: "HTML",
      CSS: "CSS",
      JS: "JS",
      IMG: "IMG",
      TEMPLATE: "TEMPLATE",
      NONE: "NONE"
    };

    ServerFile.fileTypeToFileExt = {
      HTML: "html",
      CSS: "css",
      JS: "js",
      TEMPLATE: "handlebars"
    };

    ServerFile.fileExtToFileType = _.invert(ServerFile.fileTypeToFileExt);

    ServerFile.prototype.initialize = function() {
      this.on("change:type", this.updateFileType);
      this.updateFileType();
      if (this.get("dateCreated") === null) {
        return this.set("dateCreated", new Date());
      }
    };

    ServerFile.prototype.updateFileType = function() {
      if (this.get("type")) {
        return this.set("fileType", ServerFile.rawTypeToFileType(this.get("type")));
      } else {
        return this.set("fileType", ServerFile.filenameToFileType(this.get("name")));
      }
    };

    ServerFile.rawTypeToFileType = function(rawType) {
      if (rawType.indexOf("image") !== -1) {
        return ServerFile.fileTypeEnum.IMG;
      }
      if (rawType.indexOf("html") !== -1 || rawType === "text/plain") {
        return ServerFile.fileTypeEnum.HTML;
      }
      if (rawType.indexOf("css") !== -1) {
        return ServerFile.fileTypeEnum.CSS;
      }
      if (rawType.indexOf("handlebars") !== -1) {
        return ServerFile.fileTypeEnum.TEMPLATE;
      }
      if (rawType.indexOf("javascript") !== -1) {
        return ServerFile.fileTypeEnum.JS;
      }
      return console.error("Unable to identify file type: " + rawType);
    };

    ServerFile.filenameToFileType = function(filename) {
      var ext;

      ext = filename.replace(/.*\.([a-z]+$)/i, "$1");
      switch (ext) {
        case "html":
          return ServerFile.fileTypeEnum.HTML;
        case "jpg":
        case "jpeg":
        case "png":
          return ServerFile.fileTypeEnum.IMG;
        case "css":
          return ServerFile.fileTypeEnum.CSS;
        case "js":
          return ServerFile.fileTypeEnum.JS;
        case "handlebars":
          return ServerFile.fileTypeEnum.TEMPLATE;
        case "tmpl":
          return ServerFile.fileTypeEnum.TEMPLATE;
      }
      console.error("Attempt to convert file name " + filename + " to file type failed, returning null.");
      return null;
    };

    return ServerFile;

  }).call(this, Backbone.Model);

}).call(this);

/*
//@ sourceMappingURL=ServerFile.map
*/
