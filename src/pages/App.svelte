<script>
    import Container from './Container.svelte';
    import PoemImage from './PoemImage.svelte';
    import LocalQrCode from './LocalQrCode.svelte';
    import Progress from './Progress.svelte';
    import { getPoemUrl } from './env.js';
    import { compressImage } from './utils/compressImage.js';
    import { isMobile } from './utils/isMobile';
    import { adaptScreen } from './utils/adaptScreen';
    import { getRandomApi } from './utils/getRandomApi'

    const UNIT_SIZE = 1024 * 1024;
    let fileInput;
    let fileSize;
    let imageDataUrl = '';
    let poem = [];
    let isLoading = false;
    let showError = false;
    let errMsg = '';

    if (isMobile) {
        adaptScreen(40);
    }

    function handleUpload() {
        if (isLoading) {
            return;
        }
        fileInput.value = '';
        fileInput.click();
    }
    async function handleImage() {
        showError = false;
        let file = fileInput.files[0];
        fileSize = file.size / UNIT_SIZE;
        if (fileSize > 7) {
            showErrorMsg({}, '请上传小于7M的图片！')
            return;
        }
        let imageData = await compressImage(file);
        isLoading = true;
        fetch((getRandomApi()), {
            method: 'POST',
            body: JSON.stringify({ image: imageData[0].substring(imageData[0].indexOf(',') + 1) })
        }).then(data => data.json()).then(data => {
            isLoading = false;
            if (data.errorCode || !data.poem) {
                showErrorMsg(data.errorMsg);
                return;
            }
            imageDataUrl = imageData[1];
            poem = data.poem;
            poem.shift();
        }).catch(error => {
            isLoading = false;
            showErrorMsg(error);
        });
    }

    function showErrorMsg(errorInfo, msg) {
        if (showError) return;
        if (msg) {
            errMsg = msg;
        } else {
            errMsg = setErrorMsg(errorInfo);
        }
        showError = true;
        setTimeout(() => {
            showError = false;
        }, 3000);
    }

    function setErrorMsg(errorInfo) {
        if (errorInfo && (errorInfo.error_code === 'NLP.0301' || (errorInfo.result && errorInfo.result.suggestion !== 'pass'))) {
            return '无法为这张图片配诗，请您换一张试试！';
        } else if (errorInfo && errorInfo.error_code === 'APIG.0308') {
            return '每天最多支持1000次访问，今天已达限额，明天再体验吧！';
        } else {
            return '请求失败，请稍后重试！';
        }
    }

    function handleBack() {
        poem = [];
        imageDataUrl = '';
    }
</script>

<Container>
    <div class="init {isMobile ? 'mobile' : ''} {poem.length ? 'poem' : 'home'}">
        {#if !poem.length}
            <div class="top-product">贾翔邀请你</div>
            <div class="title"><div class="red-border lf"></div>识图作诗<div class="red-border rg"></div></div>
            <div class="description">上传图片，让 <span class="letter">AI</span> 帮你写首诗~</div>
            <div class="error">
                <div class={`${showError ? 'show' : 'hide'}`}>{errMsg}</div>
            </div>
            <div class="btn-container">
                <button class="btn {isLoading ? 'loading' : ''}" on:click={handleUpload}>上传图片</button>
                <Progress isLoading={isLoading} />
            </div>
            <div class="main"><div class="hw-logo"></div>此页面由华为云-Ai作诗改写 由<a class="bottom-product" target="_blank" href="https://devstar.developer.huaweicloud.com/devstar/devstar-templates">DevStar</a>服务生成</div>
        {:else}      
            <PoemImage image={imageDataUrl} poem={poem} onBack={handleBack} fileSize={fileSize}></PoemImage>
        {/if}
    </div>
    <input type="file" bind:this={fileInput} on:change={handleImage} accept="image/png, image/jpeg">
    {#if !isMobile}
        <div class="qrcode">
            <LocalQrCode />
        </div>
    {/if}
</Container>
<style lang="scss">

:root {
    font-size: 10px;
}
input[type="file"] {
    display: none;
}
.qrcode {
    position: fixed;
    bottom: 20px;
    left: 20px;
    &:hover {
        z-index: 10000;
    }
}
.init {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-weight: 100;
    font-family: 'PingFangSC-Regular';
    text-shadow: 0px 0px 12px rgba(255, 255, 255, 1);
    color: #252B3A;
    .top-product {
        margin-top: 5vh;
        font-size: 2rem;
        font-weight: 500;
        line-height: 2.8rem;
    }
    .title {
        display: flex;
        margin-bottom: 2vh;
        line-height: 11.8rem;
        font-size: 8.4rem;
        font-weight: 100;
        text-shadow: 0 0 1.2rem rgba(255, 255, 255, 1);
        .red-border {
            &.lf {
                width: 3rem;
                background: url('https://devstar.obs.cn-north-4.myhuaweicloud.com/quotation_left.png') no-repeat;
            }
            &.rg {
                width: 3.4rem;
                background: url('https://devstar.obs.cn-north-4.myhuaweicloud.com/quotation_right.png') no-repeat;
                background-position-y: bottom;
            }
        }
    }
    .description {
        margin-bottom: 28.2vh;
        line-height: 3.3rem;
        font-size: 2.4rem;
        font-weight: normal;
        text-shadow: 0 0 1.2rem rgba(255, 255, 255, 1);
        padding: 0 2rem;
        text-align: center;
        .letter {
            color: #C3272B;
        }
    }
    .main {
        position: absolute;
        display: flex;
        align-items: center;
        bottom: 7.8vh;
        font-size: 1.4rem;
        .hw-logo {
            width: 5rem;
            height: 5rem;
            margin-right: 1rem;
            background: url('https://devstar.obs.cn-north-4.myhuaweicloud.com/huawei_logo.png') no-repeat;
            background-size: contain;
        }
        .bottom-product {
            margin: 0 0.5rem;
            font-weight: 700;
            color: #526ECC;
        }
    }
    .error {
        position: absolute;
        top: 50%;
        z-index: 1000;
        font-size: 1.8rem;
        font-weight: bold;
        color: #C3272B;
        > div {
            position: absolute;
            width: 100vw;
            left: 50%;
            transform: translateX(-50%);
            transition: all .3s;
            text-align: center;
        }
        .show {
            opacity: 1;
        }
        .hide {
            opacity: 0;
        }
    }
    .btn-container {
        position: relative;
        margin-bottom: 5rem;
    }
    .btn {
        font-size: 1.4rem;
        border: none;
        outline: none;
        cursor: pointer;
        background-color: #C7000B;
        color: #fff;
        padding: 0.5rem 2rem;
        box-sizing: border-box;
        width: 12rem;
        height: 4rem;
        border-radius: 0.2rem;
        box-shadow: 0 0px 0.8rem rgba(46,78,126, .3);
        transition: all .1s;
        -webkit-tap-highlight-color:rgba(0, 0, 0, 0);
        tap-highlight-color:rgba(0, 0, 0, 0);
        &:hover {
            background-color: #ce3138;
            box-shadow: 0.3rem 0.5rem 0.8rem rgba(46,78,126, .3);
        }
        &:active {
            box-shadow: 0.5rem 0.7rem 0.8rem rgba(46,78,126, .3);
        }
        &.loading {
            cursor: not-allowed;
            &:hover {
                background-color: #b8bbc2;
            }
        }
    }

    &.home {
        height: 95vh;
    }
    
    &.poem {
        min-height: 90vh;
        padding-bottom: 5vh;
    }

    &.mobile {
        .title {
            font-size: 6.4rem;
        }
        .description {
            font-size: 1.8rem;
            margin-bottom: 16rem;
        }
        .btn-container {
            position: absolute;
            top: 66%;
        }
        .main {
            flex-wrap: wrap;
            .hw-logo {
                width: 100%;
                background-position-x: center;
            }
        }
    }
}
</style>
