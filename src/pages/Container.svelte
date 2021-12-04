<script>
    import { isMobile } from './utils/isMobile';

    let poems = [
        '蜀道难，难于上青天。',
        '冠盖满京华，斯人独憔悴。',
        '乱花渐欲迷人眼，浅草才能没马蹄。',
        '但使龙城飞将在，不教胡马度阴山。',
        '举头望明月，低头思故乡。',
        '天长地久有时尽，此恨绵绵无绝期。',
        '清水出芙蓉，天然去雕饰。',
        '晚来天欲雪，能饮一杯无？',
        '孤帆远影碧空尽，惟见长江天际流。',
        '树树皆秋色，山山唯落晖。',
        '飞流直下三千尺，疑是银河落九天。',
        '前不见古人，后不见来者。念天地之悠悠，独怆然而涕下。',
        '柴门闻犬吠，风雪夜归人。',
        '野火烧不尽，春风吹又生。',
        '清明时节雨纷纷，路上行人欲断魂。',
        '两情若是久长时，又岂在朝朝暮暮。',
        '衣带渐宽终不悔，为伊消得人憔悴。',
        '人间四月芳菲尽，山寺桃花始盛开。',
        '安能摧眉折腰事权贵，使我不得开心颜。',
        '白日放歌须纵酒，青春作伴好还乡。',
        '大漠孤烟直，长河落日圆。',
        '不识庐山真面目，只缘身在此山中。',
        '身无彩凤双飞翼，心有灵犀一点通。',
        '此情可待成追忆，只是当时已惘然。',
        '玲珑骰子安红豆，入骨相思知不知？',
        '莫愁前路无知己，天下谁人不识君。',
        '小荷才露尖尖角，早有蜻蜓立上头。',
        '抽刀断水水更流，举杯消愁愁更愁。',
        '疾风知劲草，板荡识诚臣。',
        '水光潋滟晴方好，山色空蒙雨亦奇。',
        '路漫漫其修远兮，吾将上下而求索。',
        '关关雎鸠，在河之洲。窈窕淑女，君子好逑。',
        '天苍苍，野茫茫，风吹草低见牛羊。',
        '沉舟侧畔千帆过，病树前头万木春。',
        '可怜无定河边骨，犹是春闺梦里人。',
        '忽如一夜春风来，千树万树梨花开。',
        '读书破万卷，下笔如有神。',
        '遥知兄弟登高处，遍插茱萸少一人。',
    ].sort(() => Math.random() > 0.5 ? 1 : -1);
</script>

<div class="container {isMobile ? 'mobile': ''}" id="container">
    <div class="bg">
        {#each poems as poem, i}
            <div class="line"
                on:animationend={() => { console.log('ok'); }}
                style={
                    `animation-duration: ${40 + Math.random() * 20}s; ` +
                    `animation-delay: ${Math.random() * 40 - 20}s; ` +
                    `opacity: ${Math.random() * .6 + .1}; ` +
                    `font-size: ${Math.random() * 20 + 14}px; `
                }>{poem}</div>
        {/each}
    </div>
    <slot></slot>
</div>

<style lang="scss">
.container {
    min-height: 100vh;
    position: relative;
    box-sizing: border-box;
    &.mobile {
        .bg {
            background-image: url('https://devstar.obs.cn-north-4.myhuaweicloud.com/bg_m.jpg');
        }
    }
}
.bg {
    position: absolute;
    overflow: hidden;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    z-index: -1;
    background: url('https://devstar.obs.cn-north-4.myhuaweicloud.com/bg.jpg') no-repeat;
    background-size: 100% 100%;
    .line {
        position: relative;
        margin: 10px;
        writing-mode: vertical-lr;
        font-size: 40px;
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        color: rgb(66,76,80);
        opacity: .3;
        transform: translateY(-100%);
        animation: rain 20s infinite;
    }
}
@keyframes rain {
    from {
        transform: translateY(-100%);
    }

    to {
        transform: translateY(100vh);
        opacity: 0;
    }
}
</style>