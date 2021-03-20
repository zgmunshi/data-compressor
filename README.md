# data-compressor
Compressing and Decompressing Data, Overriding localstorage behaviour to consider compression library

## Methods
```
dataCompress.init(options);

options = {
  compressionType : 'default',
  compression : true/false 
}
```

## compressionType
```
1. default
2. base64
3. utf16
4. uint8
5. encodeuri
```
## API
```
dataCompress.init(options);
dataCompress.compress(str);
dataCompress.decompress(str);
```

## LocalStorage API
Localstorage `setItem` & `getItem` is overrided to have compressed data
#Methods
```
setItem - sets item to localstorage
getItem - get item from localstorage
size(key) - get size of localstorage or size of specific key in bytes
sizeFormat(size,format) - get size in specified format default is bytes -> bytes, kb, mb,gb, tb
```
