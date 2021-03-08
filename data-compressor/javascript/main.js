let urls = ['modules/lzstring/js/lz-string.min.js','modules/data-compressor/js/data-compressor.js','modules/local-storage/js/local-storage.js']
helper.import.urls(urls).then(function(){
    dataCompress.init();
    console.log('imported');
    
    let size = localStorage.size();
    console.log(size + "bytes",localStorage.sizeFormat(size,'kb') + " kb");

    let text = "test";
    text = localStorage.setItem("hello",text);
    console.log(text);

    let decompress = localStorage.getItem("hello");
    console.log(decompress);
});