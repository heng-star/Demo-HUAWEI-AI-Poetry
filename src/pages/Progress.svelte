<script>
    export let isLoading;
</script>

<div class="container">
    <div class={`dot dot-1${isLoading ? ' loading' : ''}`} style={`display: ${isLoading ? 'block' : 'none'};`}></div>
    <div class={`dot dot-2${isLoading ? ' loading' : ''}`} style={`display: ${isLoading ? 'block' : 'none'};`}></div>
    <div class={`dot dot-3${isLoading ? ' loading' : ''}`} style={`display: ${isLoading ? 'block' : 'none'};`}></div>
</div>

<style lang="scss">
.container {
    position: absolute;
    width: 0;
    height: 0;
    left: 50%;
    top: calc(50% + 4px);
    .dot {
        width: 0;
        height: 0;
        position: absolute;
        left: 0;
        top: 0;
        opacity: .6;
        &.loading {
            animation: loading 2s infinite;
            &.dot-1 {
            }
            &.dot-2 {
                animation-delay: .07s;
            }
            &.dot-3 {
                animation-delay: .15s;
            }
        }
        animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1);
        transform: rotate(225deg);
    }
    .dot-1 {
        &::after {
            content: '';
            position: absolute;
            display: block;
            left: 50px;
            top: 50px;
            width: 18px;
            height: 18px;
            background-color: #000;
            border-radius: 50%;
        }
    }
    .dot-2 {
        &::after {
            content: '';
            position: absolute;
            display: block;
            left: 53px;
            top: 53px;
            width: 12px;
            height: 12px;
            background-color: #000;
            border-radius: 50%;
        }
    }
    .dot-3 {
        &::after {
            content: '';
            position: absolute;
            display: block;
            left: 57px;
            top: 57px;
            width: 4px;
            height: 4px;
            background-color: #000;
            border-radius: 50%;
        }
    }
}
@keyframes loading {
    from {
        transform: rotate(225deg);
    }

    to {
        transform: rotate(585deg);
    }
}
</style>