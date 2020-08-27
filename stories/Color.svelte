<script>
    import {onMount} from 'svelte'
    import './color.css'
    onMount(() => {

        // 后面重新写入
        const eleColor = document.getElementById('color');
        const canvas = document.querySelectorAll('canvas')[0];
        const context = canvas.getContext('2d');
        // 结果canvas
        const canvasResult = document.querySelectorAll('canvas')[1];
        const contextResult = canvasResult.getContext('2d');
        // 图片数据
        let imgData = null, imgDataResult = null;
        // 尺寸数据
        const w = 165, h = 165;
        // canvas上绘制图片
        const img = new Image();
        img.onload = function () {
            context.drawImage(this, 0, 0);
            contextResult.drawImage(this, 0, 0);
            // 获取像素信息数据
            imgData = context.getImageData(0, 0, w, h);
            imgDataResult = contextResult.getImageData(0, 0, w, h);
        };
        img.src = '/riziyan-favicon.png';

        // 取色
        let rgbaPicker = '[0,0,0,255]';
        canvas.addEventListener('click', function (event) {
            const rect = this.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            rgbaPicker = context.getImageData(x, y, 1, 1).data;
            // color输入框变化
            let strHex = '#';
            for (let i = 0; i < rgbaPicker.length - 1; i++) {
                let hex = rgbaPicker[i].toString(16);
                if (hex.length < 2) {
                    hex = '0' + hex;
                }
                strHex += hex;
            }
            eleColor.value = strHex;
        });
        const eleTolerance = document.getElementById('tolerance');
        const eleButton = document.getElementById('button');

        if (eleButton && eleTolerance) {
            eleButton.onclick = function () {
                // 像素点色值
                const rgba = rgbaPicker;
                // 容差大小
                const tolerance = eleTolerance.value;
                // 基于原始图片数据处理
                for (let index = 0; index < imgData.data.length; index += 4) {
                    const r = imgData.data[index];
                    const g = imgData.data[index + 1];
                    const b = imgData.data[index + 2];

                    if (Math.sqrt(
                            (r - rgba[0]) * (r - rgba[0]) +
                            (g - rgba[1]) * (g - rgba[1]) +
                            (b - rgba[2]) * (b - rgba[2])) <= tolerance
                    ) {
                        imgDataResult.data[index] = 0;
                        imgDataResult.data[index + 1] = 0;
                        imgDataResult.data[index + 2] = 0;
                        imgDataResult.data[index + 3] = 0;
                    } else {
                        imgDataResult.data[index] = r;
                        imgDataResult.data[index + 1] = g;
                        imgDataResult.data[index + 2] = b;
                        imgDataResult.data[index + 3] = imgData.data[index + 3];
                    }
                }
                // put数据
                contextResult.putImageData(imgDataResult, 0, 0);
            };
        }
    })
</script>

<div class="demo">
    <h4>左取色图，右效果图</h4>
    <canvas width="165" height="165"></canvas>
    <canvas width="165" height="165"></canvas>
    <p>取色色值：<input type="color" id="color"></p>
    <p>容差范围：<input type="number" id="tolerance" min="0" max="255" step="1" value="0" size="4"></p>
    <p><button id="button">执行去色</button></p>
</div>
