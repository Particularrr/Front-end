//form为jquery对象
function transformToJson(form) {
    var jsonData = {};
    var formData = form.serializeArray();
    $.each(formData, function () {
        var dataType = $("select[name='" + this.name + "']").attr("data-type");
        var value=this.value
        //这里可以进行自由定义
        if(value=="无" || value==""){
            value=null;
        }
        if (jsonData[this.name]) {
            if (!jsonData[this.name].push) {
                jsonData[this.name] = [jsonData[this.name]];
            }
            jsonData[this.name].push(value || '');
        } else {
            if (dataType == 'array') {
                jsonData[this.name] = [];
                jsonData[this.name].push(value || '');
            } else {
                jsonData[this.name] = value || '';
            }
        }
    });
    return handle(jsonData);
}

function  handle(obj) {
    let  obj2 = {};
    for (var  k  in  obj) {
        var  data = k.split('.');
        data.reduce((prev, cur, index, arr) => {
            if (!prev[cur]) {//不存在等于空对象
                prev[cur] = {};
            }
            if (index + 1 == arr.length) {
                if (Object.prototype.toString.call(obj[k]) === '\[object Object]') {//值为对象递归调用
                    prev[cur] = handle(obj[k])
                } else {
                    prev[cur] = obj[k]
                }
            }
            return  prev[cur]
        }, obj2)
    }
    return  obj2;
}