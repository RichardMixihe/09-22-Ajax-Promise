axios.defaults.baseURL = 'http://www.itcbc.com:3006'


// axios.get('',).then(({data:res})=>{})


async function renderNews(){
    try {
        let {data:res} = await axios.get('/api/news')
        console.log(res);
        let arr = res.data.map(item=>{
            return `
            <div class="news-item">
                <img class="thumb" src="http://www.itcbc.com:3006${item.img}" alt="">
                <div class="right-box">
                    <!-- 新闻标题 -->
                    <h1 class="title">${item.title}</h1>
                    <div class="footer">
                    <div>
                        <!-- 新闻来源 -->
                        <span>${item.source}</span>&nbsp;&nbsp;
                        <!-- 发布日期 -->
                        <span>${item.time}</span>
                    </div>
                    <!-- 评论数量 -->
                    <span>评论数：${item.cmtcount}</span>
                    </div>
                </div>
            </div>
            `
        })
        document.querySelector('#news-list').innerHTML = arr.join('');
    } catch (err) {
        console.log(err);
    }
}
renderNews()