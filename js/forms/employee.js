var employee = {};

$(function () {

    employee.prototype = {
        version: "v1.0",
        name: "employee",
        tableId: "employee",
        modal: "employeeModal",
        checkAllId: "CpMainCheckAll",
        returnStatus: "SUCCESS",
        returnTitle: "操作成功",
        statusTitle: "请选择一条数据！",
        idFailure: "获取id失败",
        prompt: "提示",
        pleaseConfirm: "请确认！",
        wantToDelete: "您确定要删除吗?",
        isTest: "是",
        noTest: "否",
        banned: "禁用",
        enable: "启用"
    };

    //初始化
    employee.gridInit = {
        ordering: false,
        searching: true,
        lengthChange: true,
        paging: true,
        scrollCollapse: true,
        serverSide: false,
        search: true,
        processing: true,
        scrollY: 500,
        scrollX: "100%",
        scrollXInner: "100%",
        jQueryUI: false,
        autoWidth: true,
        autoSearch: false
    };

    employee.status = [
        {
            "searchable": false,
            "targets": 0,
            "render": function () {
                return '<input type="checkbox" name="employeecheckList" class="checkbox" />';
            }
        },//第一行不进行排序和搜索
        {
            defaultContent: '', targets: ['_all']
        } //所有列设置默认值为空字符串
    ];

    employee.filed = [
        {"data": null},     // checkbox
        {"data": "name"},
        {"data": "position"},
        {"data": "salary"}
    ];

    employee.details = [];

});

$(document).ready(function () {
    dataTablesInit(employee);
});