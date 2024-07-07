    <!--    start违禁词, 参考修改词 -->
    const keywords = ["钱","玄学","离火运","末法时代","轮回","福报","前世","业力","死","命运","宿命","NPD","傻逼","小人","心经","身心灵","因果","跳楼","使命","灵魂","天机","法门","疗愈","神","鬼","佛","菩提心","耶稣","菩萨","恋爱脑","自杀","屁","开悟","觉醒","天眼","法眼","抑郁","双相情感障碍","自闭","报应","现世报","桃花劫","双生火焰","系统","最","赚","天道","仁波切","观世音","中国","一切","永远","牢","修罗","他心通","过去心","现在心","未来心"]    
    
    const editWords = ["💰","玄x","离🔥运","末F时代","轮H","F报/福b","前s","邺力","s","命y","宿m","N*D","傻*","x人","❤️经","身❤️灵","因G","眺楼","使m","灵H","天j","fa门","疗y","S","G","fo","菩ti心","耶su","菩sa","恋ai脑","自S","P","开勿","觉X","天yan","fa眼","yy","双X情感Z碍","自bi","B应","现S报","桃花jie","双生🔥焰","X统","蕞","贝兼","天噵","仁bo切","观S音","中G","yi切","永y","lao","修luo","他❤️通","过去❤️","现在❤️","未来❤️"]
    <!--    end违禁词, 参考修改词 -->
    
    <!--    start易错词  -->
    const noticeWords = ["气运","着相","度人","互度","佛慢","金刚力","双相情感障碍"] 
    <!--    end易错词  -->
  
    new Vue({
      el: '#app',
      data: {
        keywords,
        editWords,
        noticeWords,
        searchTerm: "",
        filterWords: "",
        highlightedText: "",
        num: null,
      },
      methods: {
        highlightKeywords() {
          this.filterWords = "";
          this.highlightedText = "";
          this.num = null
          if (this.searchTerm) {
            let regex = new RegExp(this.keywords.join("|"), "gi");
            let matchedKeywords = this.searchTerm.match(regex);
            if (matchedKeywords) {
              let mixedwords = []
              let uniqueKeywords = [...new Set(matchedKeywords)];
              for(var i=0;i<uniqueKeywords.length;i++){
                  let beforeword = uniqueKeywords[i]
                  let afterword = ""
                  let index = this.keywords.indexOf(beforeword)
                  afterword = this.editWords[index]  
                  let afterwordspan = `<span style="color:#666;">（${afterword}）</span>`
                  mixedwords.push(
                    beforeword+afterwordspan
                  )          
              }
              this.num = mixedwords.length;
              this.filterWords = mixedwords.join("，");
            } else {
              this.filterWords = "";
              this.num = 0
            }
            this.highlightedText = this.searchTerm.replace(regex, match => {
              if(this.searchTerm.match(new RegExp(match,'gi'))){
                return `<span style="background-color: #F56C6C;color:white;">${match}</span>`;
              }else{
                return match;
              }
            });
          } else {
              this.num = 0

          }
        },
        clearText(){
            this.searchTerm = "";
            this.filterWords = "";
            this.highlightedText = "";
            this.num = null
        }
      }
    });
