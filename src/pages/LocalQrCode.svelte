<script>
    import QRCode from 'qrcode';
    let src;

    QRCode.toDataURL(
        `https://devstar.developer.huaweicloud.com/devstar/devstar-templates/3b14cda27085488c83abb1e5fe9d2922`,
        { width: 150, color: { dark: '#392F41', light: '#fff' }  }
    ).then(url => {
        src = url;
    });
</script>

<div class="container">
    <span>
        扫描二维码在移动端查看
    </span>
    <img src={src} alt="">
</div>

<style lang="scss">
span {
    text-align: center;
    line-height: 12px;
    font-size: 10px;
    background-color: #fff;
    width: 150px;
    height: 150px;
    padding-top: 15px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    height: 10px;
    z-index: 10;
}
img {
    opacity: .8;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}
.container {
    display: flex;
    flex-direction: column;
}
</style>
