(function () {

    'use strict';

    // GLOBAL Variables
    let userUid = CONFIG.uid;
    let baseURL = '';
    let subdomain = '';

    // Start Program
    getArtistsPosts();
    CONFIG.copy._updateHomepageCopy();
    CONFIG.copy._headerFooterComponents();

    // All Functions
    function getArtistsPosts() {
        if(CONFIG.baseUrl){
            baseURL = CONFIG.baseUrl;

            $.get(baseURL + '/getArtistsPosts?uid=' + userUid,function(data, status) {
                createPosts(data);
            });
        } else {
            console.log("No baseURL defined");
        }
    }

    function createPosts(posts) {
        let postsHTML = '';
        if(CONFIG.subdomain) {
            subdomain = CONFIG.subdomain;
        }
            
        for(let key in posts) {

            let post = posts[key];
            // console.log(post)


            let postImgUrl = post['imgUrls'][
                Object.keys(post['imgUrls'])[0]
            ];

            let postHTML = '<div class="portfolio all ' + post.category + '" data-cat="logo">' +
                '<a href="' + subdomain + '/portfolio?id=' + key + '" class="portfolio-wrapper">' +
                    '<img src="' + postImgUrl + '" alt="" />' +
                '</a>' +
            '</div>';


            postsHTML += postHTML;
        }

        $("#portfoliolist").html(postsHTML);

    }

}());