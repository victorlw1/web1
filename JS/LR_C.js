window.addEventListener("resize", function () {
    if (document.body.clientWidth < 1360) {
        let elements = document.getElementsByClassName("center_pos")
        Array.prototype.forEach.call(elements, element => {
            element.style.top = "50%";
        });
    }
    if (document.body.clientWidth > 1360) {
        let elements = document.getElementsByClassName("center_pos")
        Array.prototype.forEach.call(elements, element => {
            element.style.top = "25%";
        });
    }
});
window.addEventListener("load", function () {
    let input_canvas = $("canvas#left-board")[0];
    let canvasW = input_canvas.width; //获取画布的宽度
    let canvasH = input_canvas.height; //获取画布的高度

    let road_selections = $("ul#road-selections")[0];
    let polygon_selections = $("ul#polygon-selections")[0];

    let isDrawing = false;
    let isDrawRoad = false;
    let isDrawField = false;
    let isDrawMainRoad = false;
    let isDrawSubmainRoad = false;
    let isDrawBranchRoad = false;
    let isDrawSquare = false;
    let isDrawPolygon = false;
    let isDrawCustom = false;

    let mainRoad = road_selections.getElementsByClassName("main-road")[0]
    let submainRoad = road_selections.getElementsByClassName("submain-road")[0]
    let branchRoad = road_selections.getElementsByClassName("branch-road")[0]
    let square = polygon_selections.getElementsByClassName("square-field")[0]
    let polygon = polygon_selections.getElementsByClassName("polygon-field")[0]
    let custom = polygon_selections.getElementsByClassName("custom-field")[0]

    mainRoad.style.backgroundColor =
        null
    submainRoad.style.backgroundColor =
        null
    branchRoad.style.backgroundColor =
        null
    square.style.backgroundColor =
        null
    polygon.style.backgroundColor =
        null
    custom.style.backgroundColor =
        null

    let cache_img = []; //用于存放画布图片截图的数组

    let ctx = input_canvas.getContext("2d"); //创建画布对象
    ctx.lineCap = "round"; //设置线条的结束端点样式
    ctx.lineJion = "round"; //设置两条线相交时，所创建的拐角类型
    ctx.fillStyle = "black";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;

    road_selections.addEventListener("mousedown", function (e) {
        let target = e.target;
        isDrawRoad = true;
        isDrawField = false;
        if (target.className == "main-road") {
            mainRoad.style.backgroundColor =
                "rgba(255, 255, 255, 0.5)"
            submainRoad.style.backgroundColor =
                null
            branchRoad.style.backgroundColor =
                null
            square.style.backgroundColor =
                null
            polygon.style.backgroundColor =
                null
            custom.style.backgroundColor =
                null
            isDrawMainRoad = true;
            isDrawSubmainRoad = false;
            isDrawBranchRoad = false;
            isDrawSquare = false;
            isDrawPolygon = false;
            isDrawCustom = false;
        }
        if (target.className == "submain-road") {
            mainRoad.style.backgroundColor =
                null
            submainRoad.style.backgroundColor =
                "rgba(255, 255, 255, 0.5)"
            branchRoad.style.backgroundColor =
                null
            square.style.backgroundColor =
                null
            polygon.style.backgroundColor =
                null
            custom.style.backgroundColor =
                null
            isDrawMainRoad = false;
            isDrawSubmainRoad = true;
            isDrawBranchRoad = false;
            isDrawSquare = false;
            isDrawPolygon = false;
            isDrawCustom = false;
        }
        if (target.className == "branch-road") {
            mainRoad.style.backgroundColor =
                null
            submainRoad.style.backgroundColor =
                null
            branchRoad.style.backgroundColor =
                "rgba(255, 255, 255, 0.5)"
            square.style.backgroundColor =
                null
            polygon.style.backgroundColor =
                null
            custom.style.backgroundColor =
                null
            isDrawMainRoad = false;
            isDrawSubmainRoad = false;
            isDrawBranchRoad = true;
            isDrawSquare = false;
            isDrawPolygon = false;
            isDrawCustom = false;
        }
    })
    polygon_selections.addEventListener("mousedown", function (e) {
        let target = e.target;
        isDrawField = true;
        isDrawRoad = false;
        if (target.className == "square-field") {
            mainRoad.style.backgroundColor =
                null
            submainRoad.style.backgroundColor =
                null
            branchRoad.style.backgroundColor =
                null
            square.style.backgroundColor =
                "rgba(255, 255, 255, 0.5)"
            polygon.style.backgroundColor =
                null
            custom.style.backgroundColor =
                null
            isDrawMainRoad = false;
            isDrawSubmainRoad = false;
            isDrawBranchRoad = false;
            isDrawSquare = true;
            isDrawPolygon = false;
            isDrawCustom = false;
        }
        if (target.className == "polygon-field") {
            mainRoad.style.backgroundColor =
                null
            submainRoad.style.backgroundColor =
                null
            branchRoad.style.backgroundColor =
                null
            square.style.backgroundColor =
                null
            polygon.style.backgroundColor =
                "rgba(255, 255, 255, 0.5)"
            custom.style.backgroundColor =
                null
            isDrawMainRoad = false;
            isDrawSubmainRoad = false;
            isDrawBranchRoad = false;
            isDrawSquare = false;
            isDrawPolygon = true;
            isDrawCustom = false;
        }
        if (target.className == "custom-field") {
            mainRoad.style.backgroundColor =
                null
            submainRoad.style.backgroundColor =
                null
            branchRoad.style.backgroundColor =
                null
            square.style.backgroundColor =
                null
            polygon.style.backgroundColor =
                null
            custom.style.backgroundColor =
                "rgba(255, 255, 255, 0.5)"
            isDrawMainRoad = false;
            isDrawSubmainRoad = false;
            isDrawBranchRoad = false;
            isDrawSquare = false;
            isDrawPolygon = false;
            isDrawCustom = true;
        }
    })

    let startX, startY;
    input_canvas.addEventListener("mousedown", function (e) {
        if (!isDrawing) {
            isDrawing = true;

            let pic = ctx.getImageData(0, 0, canvasW, canvasH); //获取当前画布的图像
            cache_img.push(pic); //将当前图像存入数组

            ctx.beginPath(); //起始/重置一条路径
            startX = e.offsetX;
            startY = e.offsetY;
            ctx.moveTo(startX, startY); //把路径移动到画布中的指定点

            if (isDrawRoad) {
                ctx.strokeStyle = "blue"
                if (isDrawMainRoad) {
                    ctx.lineWidth = 16;
                }
                if (isDrawSubmainRoad) {
                    ctx.lineWidth = 10;
                }
                if (isDrawBranchRoad) {
                    ctx.lineWidth = 4;
                }
            }
            if (isDrawField) {
                ctx.strokeStyle = "black"
                ctx.lineWidth = 1;
            }
        }
    });
    input_canvas.addEventListener("mousemove", function (e) {
        if (isDrawing) {
            if (isDrawRoad) {
                ctx.lineTo(e.offsetX, e.offsetY);
                ctx.stroke();
            }
            if (isDrawField) {
                if (isDrawCustom) {
                    ctx.lineTo(e.offsetX, e.offsetY);
                    ctx.stroke();
                    ctx.fill();
                }
            }
        }

    });
    input_canvas.addEventListener("mouseout", function (e) {
        isDrawing = false;
    });
    input_canvas.addEventListener("mouseup", function (e) {
        if (isDrawing) {
            if (isDrawRoad) {
                isDrawing = false;
            }
            if (isDrawField) {
                if (isDrawSquare) {
                    ctx.fillRect(startX, startY, e.offsetX - startX, e.offsetY - startY);
                    isDrawing = false;
                }
                if (isDrawPolygon) {
                    let pic = ctx.getImageData(0, 0, canvasW, canvasH); //获取当前画布的图像
                    cache_img.push(pic); //将当前图像存入数组
                    ctx.lineTo(e.offsetX, e.offsetY);
                    ctx.stroke();
                    ctx.fill();
                    isDrawing = true;
                }
                if (isDrawCustom) {
                    isDrawing = false;
                }
            }
        }
    });
    $("div#clear").click(function () {
        ctx.clearRect(0, 0, canvasW, canvasH); //创建一个等大画布覆盖
    });
    $("div#redo").click(function () {
        if (cache_img.length > 0) {
            ctx.putImageData(cache_img.pop(), 0, 0); //删除图像数组最后一位
        }
    });

})