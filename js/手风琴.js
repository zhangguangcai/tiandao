/*
* @Author: 35050
* @Date:   2018-07-28 09:10:30
* @Last Modified by:   35050
* @Last Modified time: 2018-08-15 20:40:35
*/


// tab栏切换
  $(function(){
      //步骤分析
      //1 通过顶部li点击操作，设置当前li的active类名（addclass),
      //其他li移出类名(removeLlass)
          $('.xin > li').click(function(){
            $(this).addClass('active').siblings().removeClass('active');
            //2 根据当前li的索引值（index）找到底部对应的div设置selected类名，其他div移除类名
          var index = $(this).index();
          $('.main').eq(index).addClass('selected').siblings().removeClass('selected');
          });
    });
 //全部商品分类
  $(document).ready(function(){
    // 给btn设置移入事件
    $('#btn').mouseenter(function(){
      $(this).children('#box').show(500);
    })
    // 给box设置移出事件
    .mouseleave(function(){
      $(this).children('#box').hide();
    })
  })
 //轮播图开始
 $(function() {
    // 入口函数
    // ############### 1.轮播图效果 js部分 开始 ###############

    // 1.设置 左右箭头 的 显示和隐藏
    // 鼠标移入 左右箭头 显示
    var $pContent = $('#p-content');
    // 注意： hover([over,] out)方法 一个模仿悬停事件（鼠标移动到一个对象上面及移出这个对象）的方法。这是一个自定义的方法，
    // 它为频繁使用的任务提供了一种“保持在其中”的状态
    // 参数中的第一个函数 表示 鼠标移入 时 执行的操作
    // 参数中第二个函数 表示 鼠标移出 时 执行的操作

    $pContent.hover(function() {
        // 鼠标移入 显示箭头
        $('#p-content-arr').css('display', 'block');
    }, function() {
        // 鼠标移出 隐藏箭头
        $('#p-content-arr').css('display', 'none');
    });

    // 或者 

    // 分别注册 鼠标移入 和 鼠标移出
     $pContent.on('mouseenter', function(){
         $('#p-content-arr').css('display', 'block');
    });
    // 鼠标移出 左右箭头 隐藏
     $pContent.on('mouseleave', function(){
     $('#p-content-arr').css('display', 'none');
     });

    // 2.设置 点击 右箭头 实现图片轮播功能
    //  2.1 获取 左右箭头 元素
    var $pArrLeft = $('#p-arrLeft');
    var $pArrRight = $('#p-arrRight');

    //  2.2 定义变量 保存需要的值
    var p_Count = 0;
    var $p_Lis = $('#p-content-pic>ul>li');
    var $p_Ul = $('#p-content-pic>ul');
    // 获取图片宽度 使用prop() 操作自带属性
    var $imgWidth = $('#p-content-pic>ul>li>img').prop('width');

    // 打印宽度 测试是否获取成功
    // console.log('图片宽度' + $imgWidth);

    // 2.3 克隆ul > li 的第一个元素 制作假的第一张 实现无缝切换
    $p_Lis.eq(0).clone(true).appendTo($p_Ul);

    // 2.4 给右箭头 注册 点击事件 
    $pArrRight.on('click', function() {
        // 判断 如果 是最后一张(即假的第一张图片) 修改其 left 值 为 0 
        if (p_Count === $p_Lis.length) {
            $p_Ul.css('left', 0);
            p_Count = 0;
        };
        p_Count++;

        $p_Ul.animate({

            left: -p_Count * $imgWidth

        }, 400, 'linear');

    });

    // 2.5 给左箭头 注册 点击事件
    $pArrLeft.on('click', function() {
        // 判断 如果 是第一张 再点击左箭头时 将其left 值修改为 最后一张的位置 让其显示最后一张
        if (p_Count === 0) {
            $p_Ul.css('left', -$p_Lis.length * $imgWidth);
            p_Count = $p_Lis.length;
        }
        p_Count--;

        $p_Ul.animate({

            left: -p_Count * $imgWidth

        }, 400, 'linear');

    });

    // 3.设置 自动定时播放
    var timer = null;

    // 将 定时器 播放图片 封装成一个函数 需要用到时候调用
    function startRun() {
        timer = setInterval(function() {
            // 定时设置 模拟点击右箭头
            $('#p-arrRight').trigger('click');

        }, 2500);
    };
    startRun();
    // 4.设置定时播放 鼠标移入移出时停止定时器
    // hover() 第一个函数表示 鼠标移入时 执行的操作
    // hover() 第二个函数表示 鼠标移出时 执行的操作

    $pContent.hover(function() {
        // 鼠标移入时 清除定时器
        clearInterval(timer);

    }, startRun);
});
 
