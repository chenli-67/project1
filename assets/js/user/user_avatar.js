$(function(){
    var layer = layui.layer;

    var $image = $('#image');
    const options = {
        aspectRatio: 1,
        preview: '.img-preview'
    }

    $image.cropper(options);

    // 为上传按钮绑定事件
    $('#btnChooseImage').on('click',function(){
        // alert('11')
        $('#file').click();
    })

    $('#file').on('change',function(e){
        var filelist = e.target.files;
        if(filelist.length === 0){
            return layer.msg('请选择图片！')
        }
        var file = e.target.files[0];
        var imgURL = URL.createObjectURL(file);
        $image
        .cropper('destroy')
        .attr('src',imgURL)
        .cropper(options);
    })
    //未确定按钮绑定事件
    $('#btnUpload').on('click',function(){
        var dataURL = $image.cropper('getCroppedCanvas',{
            width: 100,
            height: 100
        }).toDataURL('image/png');
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function(res){
                if(res.status !== 0){
                    return layer.msg('更换头像失败！');
                }
                layer.msg('更换头像成功！');
                window.parent.getUserInfo();
            }
        })
    })
})