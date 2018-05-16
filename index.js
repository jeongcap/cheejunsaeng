var cheerio = require('cheerio');
var request = require('request');

var url = 'http://www.saramin.co.kr/zf_user/search/company?searchword=%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90&searchType=auto&go=';
var company, talent;
var popup_link = "http://www.saramin.co.kr";
var notice_url_saram = "http://www.saramin.co.kr";
var notice, notice_num, notice_url;


request(url, function(error, response, html){
     if (!error) {
        var $ = cheerio.load(html);
        
        
        $('.company_tit > .tit ').first().find('a').each(function(){
            var popup_link_info = $(this);
            var popup_link_text = popup_link_info.text();
            var popup_link_javascript = (popup_link_info).attr('href');

     //       console.log(popup_link_text + " : " + popup_link_javascript);

            var js_array = popup_link_javascript.split("'");
        
    //        console.log(js_array[1]);
            
            popup_link += js_array[1];

            console.log(popup_link);

      })
    

            
        request(popup_link, function(error, response, html){
            if (!error) {
                var $1 = cheerio.load(html);
                //인재상일때
                $1('.section > .company_history_list').each(function(){
                    var talent_info = $1(this);
                    talent = talent_info.text();
                    console.log(talent);
                })

                //채용정보일때 몇건인지
                $1('.r_noti').each(function(){
                    var notice_num_info = $1(this);
                    notice_num = notice_num_info.text();
                    console.log(notice_num);
                })
                //채용정보 세부 내역 
                $1('.jcard').each(function(){
                    var notice_info = $1(this);
                    notice = notice_info.text();
                    console.log(notice);
                })
                // 세부 내역에서 채용 공고 내용 url 찾고,
                $1('.j_tit > b ').first().find('a').each(function(){
                    var notice_info_saram = $1(this);
                    notice_url_saram += (notice_info_saram).attr('href');

                    console.log(notice_url_saram);
                    
                })
                /*
                홈페이지 지원 사이트 클래스?> 접근이 안됨
                request(notice_url_saram, function(error, response, html){
                    if (!error) {
                        console.log("gg");
                        var $2 = cheerio.load(html);
                        $2('.wrap_recruit_view ').each(function(){
                            
                            console.log("gg");


                            var notice_url_info = $2(this);
                            notice_url = (notice_url_info).attr('href');

                           console.log(notice_url);
                           
                        })
                    }
                });
                */
            }

        });



  }

});
