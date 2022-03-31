<template>
  <div class="section-title">
    <div class="divider"></div>
    <div class="word"><slot></slot></div>
  </div>
</template>

<script>
export default {
  name: 'section-title',
  setup() {
    return {}
  },
  data() {
    return {}
  },
}
</script>

<style lang="less">
.section-title {
  position: relative;
  height: 30px;
  .word {
    font-family: PingFangSC-Medium;
    font-size: 20px;
    color: #111111;
    letter-spacing: 0;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    line-height: 20px;
    padding-right: 15px;
    background-color: #ffffff;
    position: absolute;
    transform: translateY(-50%);
    top: 50%;
    &:before {
      content: '';
      display: inline-block;
      width: 6px;
      height: 20px;
      background: #ff5f18;
      margin-right: 15px;
    }
  }
  .divider {
    position: absolute;
    transform: translateY(-50%);
    top: 50%;
    width: 100%;
    height: 1px;
    opacity: 0.1;
    background: #111111;
  }
  margin: 30px 0px;
}
</style>
