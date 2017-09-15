var t = {};
var loc = 0;        // 缓存定位
var key = '';       // 定义localStorage的key，即为表名
var cache = '';     // 缓存

//dataTables方法封装
function dataTablesInit(elo) {
    t = $('#' + elo.prototype.tableId).DataTable({
        "ordering": elo.gridInit.ordering,
        "columns": elo.filed,//字段
        "columnDefs": elo.status,//列表状态
        "language": {
            "sProcessing": "处理中...",
            "sLengthMenu": "显示 _MENU_ 项结果",
            "sZeroRecords": "没有匹配结果",
            "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
            "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
            "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
            "sInfoPostFix": "",
            "sSearch": "搜索:",
            "sUrl": "",
            "sEmptyTable": "未搜索到数据",
            "sLoadingRecords": "载入中...",
            "sInfoThousands": ",",
            "oPaginate": {
                "sFirst": "首页",
                "sPrevious": "上页",
                "sNext": "下页",
                "sLast": "末页"
            },
            "oAria": {
                "sSortAscending": ": 以升序排列此列",
                "sSortDescending": ": 以降序排列此列"
            }
        },
        "initComplete": function () {
            //加载完成之后 初始化checkbox
            checkbox(elo.prototype.tableId);

            //checkbox全选
            $("#" + elo.prototype.checkAllId).click(function () {
                if ($(this).prop("checked")) {
                    $("input[name='employeecheckList']").prop("checked", true);
                    $("tr").addClass('selected');
                } else {
                    $("input[name='employeecheckList']").prop("checked", false);
                    $("tr").removeClass('selected');
                }
            });
        }
    });

    // add
    $("#save").click(function () {
        addData(elo);

        loc = cache.length - 1;
        t.row.add(cache[loc]).draw();
    });

    // edit
    $("#edit").click(function () {
        edit(elo);
    });

    // delete
    $("#del").click(function () {
        del();
    })
}

//选中一行 checkbox选中
function checkbox(tableId) {
    //每次加载时都先清理
    $('#' + tableId + ' tbody').off("click", "tr");
    $('#' + tableId + ' tbody').on("click", "tr", function () {
        $(this).toggleClass('selected');
        if ($(this).hasClass("selected")) {
            $(this).find("input").prop("checked", true);
        } else {
            $(this).find("input").prop("checked", false);
        }
    });
}

// 设置缓存
function set_item(elo) {
    key = elo.prototype.tableId;
    localStorage.setItem(key, JSON.stringify(employee.details));
    cache = JSON.parse(localStorage.getItem(key));
    clearModal();
}

// 清空模块内容
function clearModal() {
    $('.modal').on('hidden.bs.modal', function () {
        $(this).find("input,textarea,select").val('');
    });
}

// add
function addData(elo) {
    elo.details.push({
        "name": $("#name").val(),
        "position": $("#position").val(),
        "salary": $("#salary").val()
    });
    $("#" + elo.prototype.modal).modal("hide");
    clearModal();

    set_item(elo);
}

// delete
function del() {
    t.rows('.selected').remove().draw(false);
    cache = t.data().toArray();
    localStorage.setItem(key, JSON.stringify(cache));
}

// edit
function edit(elo) {
    var item = t.row(".selected").data();
    $("#" + elo.prototype.modal + "Label").text("修改");
    $("#" + elo.prototype.modal).modal("show");
    $("#name").val(item.name);
    $("#position").val(item.position);
    $("#salary").val(item.salary);
    $("#save").click(function () {
        del();
    })
}