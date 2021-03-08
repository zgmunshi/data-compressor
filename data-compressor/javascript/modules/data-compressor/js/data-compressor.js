let dataCompress = (function () {

	'use strict';

	let defaultOptions = {
		compressionType : 'default',
		compression : true
	};

	let compressionTypes = {
		"default" : {"c":"compress","d":"decompress"},
		"base64" : {"c":"compressToBase64","d":"decompressFromBase64"},
		"utf16" : {"c":"compressToUTF16","d":"decompressFromUTF16"},
		"uint8" : {"c":"compressToUint8Array","d":"decompressFromUint8Array"},
		"encodeuri" : {"c":"compressToEncodedURIComponent","d":"decompressFromEncodedURIComponent"},
	}

	/**
	 * public methods
	*/
	let publicAPIs = {
		init : function (options) {
			defaultOptions = { ...defaultOptions, ...options};
		},
		compress : function (str) {
			return _private.compress(str);
		},
		decompress : function (str) {
			return _private.decompress(str);
		}
	};

	/**
	 * private methods
	 */
	let _private = {
		compress : (str) => {
			if(defaultOptions.compression){
				let type = _private.getCompressionType();
				return LZString[type.c](str);
			}
			else
				return str;	
		},
		decompress : (str) => {
			if(defaultOptions.compression){
				let type = _private.getCompressionType();
				return LZString[type.d](str);
			}
			else
				return str;
		},
		getCompressionType : () => {
			return compressionTypes[defaultOptions.compressionType];
		}
	}
  
	// expose the public api's
	return publicAPIs;
})();