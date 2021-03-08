(function () {

	'use strict';

    let publicAPIs = {};
    let _private = {
        sizes : ['bytes','kb','mb','gb','tb'],
        getSize : function(key) {
            let total = 0;
            if(key){
                total = _private.calculateSize(localStorage[key]);
            }
            else{
                total = _private.getUsedSpace();
            }
            return total.toFixed(2);
        },
        calculateSize : (data,format='bytes') => {
            // Value is multiplied by 2 due to data being stored in `utf-16` format, which requires twice the space.
            return (data.length * 2);
        },
        getUsedSpace : () => {
            let total = 0;
            for (let x in localStorage) {
                let amount = _private.calculateSize(localStorage[x]);
                if (!isNaN(amount) && localStorage.hasOwnProperty(x)) {
                    total += amount;
                }
            }
            return total;
        }
    }

	/**
	 * Another public method
	 */
	publicAPIs.init = function (options) {
		/**
         * Override Storage class
         */
        Storage.prototype._setItem = Storage.prototype.setItem;
        Storage.prototype.setItem = function(key, value) {
            value = dataCompress.compress(value);
            this._setItem(key, value);
        };

        Storage.prototype._getItem = Storage.prototype.getItem;
        Storage.prototype.getItem = function(key) {
            let value = this._getItem(key);
            if(value)
                value = dataCompress.decompress(value);
            return value;
        };

        // extending storage class to return size of storage or specific key
        Storage.prototype.size = function(key) {
            return _private.getSize(key);
        }

        // extending storage class to return size of storage or specific key
        Storage.prototype.sizeFormat = function(size,format) {
            return size / Math.pow(1024,_private.sizes.indexOf(format));
        }
	};

    publicAPIs.init();

	//
	// Expose the public API's
	//

	return publicAPIs;
})();