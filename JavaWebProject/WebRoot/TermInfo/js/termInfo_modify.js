$(function () {
	$.ajax({
		url : "TermInfo/" + $("#termInfo_termId_edit").val() + "/update",
		type : "get",
		data : {
			//termId : $("#termInfo_termId_edit").val(),
		},
		beforeSend : function () {
			$.messager.progress({
				text : "正在获取中...",
			});
		},
		success : function (termInfo, response, status) {
			$.messager.progress("close");
			if (termInfo) { 
				$("#termInfo_termId_edit").val(termInfo.termId);
				$("#termInfo_termId_edit").validatebox({
					required : true,
					missingMessage : "请输入学期id",
					editable: false
				});
				$("#termInfo_termName_edit").val(termInfo.termName);
				$("#termInfo_termName_edit").validatebox({
					required : true,
					missingMessage : "请输入学期名称",
				});
			} else {
				$.messager.alert("获取失败！", "未知错误导致失败，请重试！", "warning");
				$(".messager-window").css("z-index",10000);
			}
		}
	});

	$("#termInfoModifyButton").click(function(){ 
		if ($("#termInfoEditForm").form("validate")) {
			$("#termInfoEditForm").form({
			    url:"TermInfo/" +  $("#termInfo_termId_edit").val() + "/update",
			    onSubmit: function(){
					if($("#termInfoEditForm").form("validate"))  {
	                	$.messager.progress({
							text : "正在提交数据中...",
						});
	                	return true;
	                } else {
	                    return false;
	                }
			    },
			    success:function(data){
			    	$.messager.progress("close");
                	var obj = jQuery.parseJSON(data);
                    if(obj.success){
                        $.messager.alert("消息","信息修改成功！");
                        $(".messager-window").css("z-index",10000);
                        //location.href="frontlist";
                    }else{
                        $.messager.alert("消息",obj.message);
                        $(".messager-window").css("z-index",10000);
                    } 
			    }
			});
			//提交表单
			$("#termInfoEditForm").submit();
		} else {
			$.messager.alert("错误提示","你输入的信息还有错误！","warning");
			$(".messager-window").css("z-index",10000);
		}
	});
});
