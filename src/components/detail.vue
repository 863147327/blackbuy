<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box">
                                <el-carousel height="330px">
                                    <el-carousel-item v-for="item in imglist" :key="item.id">
                                        <img :src="item.thumb_path" alt="">
                                    </el-carousel-item>
                                </el-carousel>
                            </div>
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <div class="el-input-number el-input-number--small">
                                                    <el-input-number v-model="num" :min="1" :max="goodsinfo.stock_quantity" label="描述文字"></el-input-number>

                                                </div>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <router-link :to="'/cart/'+goodsinfo.id" class="add">加入购物车</router-link>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                <ul>
                                    <li>
                                        <a href="javascript:;" @click="show=true" :class="{selected:show}">商品介绍</a>
                                    </li>
                                    <li>
                                        <a href="javascript:;" @click="show=!true" :class="{selected:!show}">商品评论</a>
                                    </li>
                                </ul>
                            </div>
                            <div class="tab-content entry" v-show="show" style="display: block;" v-html="goodsinfo.content">
                            </div>
                            <div class="tab-content" v-show="!show" style="display: block;">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea v-model.trim="message" id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit" @click="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-if="commentlist.length == 0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="(item, index) in commentlist" :key="index">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.reply_time}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                            <!--<el-pagination-->
                                                    <!--background-->
                                                    <!--layout="prev, pager, next"-->
                                                    <!--:total="Math.ceil(totalpage/pageSize)">-->
                                            <!--</el-pagination>-->

                                        <el-pagination
                                                @size-change="handleSizeChange"
                                                @current-change="handleCurrentChange"
                                                :current-page="pageIndex"
                                                :page-sizes="[5, 10, 15, 20]"
                                                :page-size="pageSize"
                                                layout="total, sizes, prev, pager, next, jumper"
                                                :total="totalcount">
                                        </el-pagination>
                                            <!--<button class="disabled" @click="previous">上一页</button>-->
                                            <!--<span class="current" :class="pageIndex==(index+1)?'red':''" v-for="(item, index) in totalpage" :key="index">{{index+1}}</span>-->
                                            <!--<button class="disabled" @click="next">下一页</button>-->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="(item, index) in hotgoodslist" :key="index">
                                        <div class="img-box">
                                            <router-link :to="'/detail/'+item.id">
                                                <img :src="item.img_url">
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <router-link :to="'/detail/'+item.id">{{item.title}}</router-link>
                                            <span>{{item.add_time | formatTime}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // import axios from 'axios'

    // import moment from 'moment'

    export default {
        name: "detail",
        data(){
            return {
                // 商品详情
                goodsinfo: {},
                // 热卖商品
                hotgoodslist: [],
                // 图片列表
                imglist: [],
                // 评论
                commentlist: [],

                // 页码
                pageIndex: 1,

                pageSize: 10,
                // 页数
                totalcount: 0,
                show: true,
                //购买数量
                num: 1,

                // 评论
                message: ''
            }
        },
        created(){
            this.$axios
                .get(`/site/goods/getgoodsinfo/${this.$route.params.id}`)
                .then(res=>{
                    // console.log(res)
                    this.goodsinfo = res.data.message.goodsinfo
                    this.hotgoodslist = res.data.message.hotgoodslist
                    this.imglist = res.data.message.imglist

                })
            // 获评论
            this.pinglun()

        },

        watch:{
            '$route.params.id'(nw){
                this.$axios
                    .get(`/site/goods/getgoodsinfo/${nw}`)
                    .then(res=>{
                        // console.log(res)
                        this.goodsinfo = res.data.message.goodsinfo
                        this.hotgoodslist = res.data.message.hotgoodslist
                        this.imglist = res.data.message.imglist

                    })
                // 获评论
                this.pinglun()
            }
        },



        methods: {
            pinglun(){
                this.$axios
                    .get(`/site/comment/getbypage/goods/${this.$route.params.id}?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`)
                    .then(res=>{
                        // console.log(res)
                        this.commentlist = res.data.message
                        this.totalcount = res.data.totalcount
                    })
            },

            handleSizeChange(val) {
                // console.log(`每页 ${val} 条`);
                this.pageSize = val
                this.pinglun()
            },
            handleCurrentChange(val) {
                this.pageIndex = val
                this.pinglun()
            },
            // 提交评论
            submit(){
                this.$axios
                    .post(`/site/validate/comment/post/goods/${this.$route.params.id}`,{
                        commenttxt: this.message
                    }).then(res=>{
                    console.log(res)
                    if(!this.message){
                            this.$message({
                                message: '请输入内容',
                                type: 'warning'
                            });
                    }else{
                        this.$message({
                            message: '恭喜你，这是一条成功消息',
                            type: 'success'
                        });
                        this.pinglun();
                    }

                })
            },

            // 加入购物车
            addcart(){

            }
        },

        // 过滤器
        // filters: {
        //     formatTime(value){
        //         return moment(value).format('YYYY年MM月DD日')
        //     }
        // }
    }
</script>

<style scoped>

    .red {
        background-color: red;
    }

    .pic-box {
        width: 395px;
    }
    .pic-box img {
        width: 100%;
        height: 100%;
    }
</style>