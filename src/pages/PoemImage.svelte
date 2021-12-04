<script>
    import QRCode from 'qrcode';
    import { isMobile } from './utils/isMobile';
    import { adaptScreen } from './utils/adaptScreen';


    if (isMobile) {
        adaptScreen(40);
    }

    let canvas = document.createElement('canvas');
    $: ctx = canvas.getContext('2d');
    let imageInstance = new Image();

    let unit = 0;
    let textRectHeight = 0;
    let bottomHeight = 0;
    let allTextHeight = 0;

    let qrCodeImageInstance = new Image();
    let qrCodeWidth = 0;

    let showTip = false;

    imageInstance.onload = function() {
        canvas.width = imageInstance.width < 2048 ? Math.max(750, imageInstance.width) : 2048;
        unit = canvas.width / 30;

        qrCodeWidth = 8 * unit;
        textRectHeight = 27 * unit;
        bottomHeight = 1.2 * unit;
        allTextHeight = textRectHeight + bottomHeight;
        canvas.height = imageInstance.height * canvas.width / imageInstance.width + allTextHeight;

        QRCode.toDataURL(
            'https://devstar.developer.huaweicloud.com/devstar/devstar-templates/3b14cda27085488c83abb1e5fe9d2922',
            { width: qrCodeWidth, color: { dark: '#E62828', light: '#fff' } }
        ).then(url => qrCodeImageInstance.src = url);

        ctx.drawImage(imageInstance, 0, 0, canvas.width, imageInstance.height * canvas.width / imageInstance.width);

        ctx.fillStyle = '#fff';
        ctx.fillRect(0, canvas.height - allTextHeight, canvas.width, allTextHeight);
    }

    export let image;
    export let poem;
    export let onBack;
    export let fileSize;

    let finalImage;

    $: imageInstance.src = image;

    let fontFamily = 'FZLTHJW--GB1-0';
    $: if (ctx && poem && poem.length !== 0) {
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, canvas.height - allTextHeight, canvas.width, allTextHeight);

        ctx.fillStyle = '#252B3A';
        ctx.textAlign = 'center';
        ctx.font = `${Math.round(1.2 * unit)}px ${fontFamily}`;
        ctx.globalAlpha = 0.5;
        poem.forEach((line, i) => {
            ctx.fillText(
                line,
                canvas.width / 2,
                canvas.height - allTextHeight + (i + 1) * 4 * unit,
            )
        });

        ctx.textAlign = 'left';
        ctx.font = `${Math.round(unit)}px ${fontFamily}`;
        ctx.fillStyle = '#424C50';
        ctx.globalAlpha = 0.4;
        ctx.fillText('欢迎扫码体验', canvas.width * 0.33, canvas.height - bottomHeight - 4.8 * unit);

        ctx.fillText('华为云DevStar - AI作诗网页代码生成器', canvas.width * 0.33, canvas.height - bottomHeight - 2.4 * unit);

        ctx.fillStyle = '#eee';
        ctx.globalAlpha = 0.9;
        qrCodeImageInstance.onload = function() {
            ctx.drawImage(qrCodeImageInstance, 1.2 * unit, canvas.height - qrCodeWidth - bottomHeight, qrCodeWidth, qrCodeWidth);
            ctx.globalAlpha = 1;
            const quality = (fileSize > 1) ? (1 / fileSize) * 2 : 1;
            let data = canvas.toDataURL('image/jpeg', quality);
            finalImage = data;
            showTip = true;
        }
    }

    function handleBack() {
        onBack && onBack();
    }
</script>

<div class="container {isMobile ? 'mobile' : ''}">
    {#if showTip}
        <div class="control">
            <div class="back" on:click={handleBack}>
                <div class="icon-container"><div class="icon back-icon"></div></div>
                返回
            </div>
        </div>
        {#if isMobile}
            <div class="img-tip mobile">长按图片保存分享</div>
        {:else}
            <div class="img-tip">右键图片保存分享</div>
        {/if} 
    {:else}
        <div class="loading">加载中……</div>
    {/if}
    <img class={finalImage ? '' : 'hidden'} src={finalImage} alt="">
</div> 

<style lang="scss">
.container {
    position: relative;
    width: 100%;
    border-radius: 10px;
    z-index: 100;
    height: 100%;
    a {
        text-decoration: none;
    }
    .control {
        display: flex;
        justify-content: flex-end;
        position: fixed;
        bottom: 5vh;
        right: 5vw;
        width: 100%;
        height: 23px;
        .back {
            display: flex;
            align-items: center;
            height: 2.5rem;
            padding: 5px 20px;
            font-size: 16px;
            font-weight: 500;
            background: #fff;
            border: 1px solid #333;
            border-radius: 2rem;
            cursor: pointer;
            .icon-container {    
                .back-icon {
                    width: 2.5rem;
                    height: 2rem;
                    background: url("https://devstar.obs.cn-north-4.myhuaweicloud.com/back1.png") no-repeat;
                }
            }
        }
    }
    .img-tip {
        color: #333;
        font-size: 1.4rem;
        text-align: center;
        line-height: 2.4rem;
        font-weight: 700;
        opacity: .6;
    }
    .loading {
        position: fixed;
        top: 50%;
        width: 100%;
        font-size: 2.4rem;
        font-weight: 600;
        color: #333;
        text-align: center;
        opacity: .6;
    }
}
img {
    -webkit-touch-callout: default;
    max-width: calc(100vw - 30px);
    max-height: calc(100vh - 100px);
    display: block;
    margin: 0 auto;
    border-radius: 10px;
    box-shadow: 3px 5px 8px rgba(0, 0, 0, .3);
}
.hidden {
    display: none;
}
</style>