let visble=4;
const post_box=document.getElementById('post_box');
const spiiner_box=document.getElementById('spiiner_box');
const loading_box=document.getElementById('loading_box');
const load_btn=document.getElementById('load_btn');

function get_post_images(post_images,post){
	let image_html=`<div id="img${post.id}postimage" class="carousel slide" data-ride="carousel"><div class="carousel-inner">`;
	post_images.map((post_image,index)=>{
							if (index == 0) {
								console.log('fist image')

								image_html+= `<div class="carousel-item active">
					                      <img class="d-block w-100" src="${post_image.image}" alt="First slide" style="height: 300px;">
					                    </div>
					                  `
				   				}else{
				   						image_html+= `<div class="carousel-item">
					                      <img class="d-block w-100" src="${post_image.image}" alt="First slide" style="height: 300px;">
					                    </div>
					                  `
				   				}
				   			})
	image_html+= `</div><a class="carousel-control-prev" href="#img${post.id}postimage" role="button" data-slide="prev">
				                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
				                    <span class="sr-only">Previous</span>
				                  </a>
				                  <a class="carousel-control-next" href="#img${post.id}postimage" role="button" data-slide="next">
				                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
				                    <span class="sr-only">Next</span>
				                  </a>
				                </div>`;

	return image_html; 

}


const handle_get_data=()=>{
		spiiner_box.style.removeProperty("display");
		$j.ajax({
			    type: "GET",

			    url: window.location.origin + `/posts/post-list-json-view/${visble}/`,

			    success: function(response) {
			    	spiiner_box.style.display ="none"
			    	let post_data=response.data
			    	console.log(post_data)
			    	if (post_data.length) {
				    	post_data.map(post=>{
				    		console.log('>>>>>>',post.post_images)
				    		post_box.innerHTML+=`
				            <div class="photo">
				     
				            <div class="row">
				                <header class="col-10 photo__header">
				                        <img src="{{post.user.get_social_user.profile_photo.url}}" class="photo__avatar" style="width: 50px;height: 50px;">
				                        <div class="photo__user-info">
				                            <a href="{{ post.user.get_social_user.get_absolute_url }}" style="color:purple;">
				                                    <span class="photo__author">{{post.user.username}}</span>
				                             </a>
				        


				                            <span class="photo__location">{{post.user.get_full_name}}</span>
				                        </div>
				        

				            
				                </header>
				                    <div class="col-2">
				                        <br>
				                   <div class="btn-group dropleft float-right pr-3" >
				                        <span  data-toggle="dropdown" aria-haspopup="true" style="cursor:pointer;" aria-expanded="false"><i class="fas fa-ellipsis-v"></i></span>
				                          <div class="dropdown-menu">
				                            
				                            <a class="dropdown-item" href="#"><i class="fas fa-eye pr-3"></i>  View </a>
				                            <a class="dropdown-item" href="#"><i class="fas fa-flag pr-3"></i> Report  </a>
				                            <a class="dropdown-item" href="#"><i class="fas fa-trash pr-3"></i> Delete </a>
				                          </div>
				                    </div>
				                    </div>
				                </div>`
				                +get_post_images(post.post_images,post)+

				                `
				                <div class="photo__info">
				                  <span class="photo__location">${post.caption}</span>
				                  <hr>
				                    <div class="photo__actions">
				                        <span class="photo__action pl-3">
				                           <i class="far fa-paper-plane fa-lg"></i>
				                        </span>
				                          <span class="photo__action pl-3">
				                           <i class="far fa-heart fa-lg"></i>
				                        </span>
				                        <span class="photo__action pl-3">
				                            <i class="far fa-comment fa-lg"></i>
				                        </span>
				                        {% if post.tagged_people.all %}
				                             <span class="photo__action pl-3"  data-toggle="modal" data-target="#model{{post.id}}{{post.user.username}}taggedmodel">
				                                <i class="far fa-user fa-lg"></i>
				                            </span>
				                                <div class="modal" id="model{{post.id}}{{post.user.username}}taggedmodel" tabindex="-1" role="dialog" aria-labelledby="model{{post.id}}{{post.user.username}}taggedTtile" aria-hidden="true">
				                                  <div class="modal-dialog modal-dialog" role="document">
				                                    <div class="modal-content">
				                                      <div class="modal-header">
				                                        <h5 class="modal-title " id="exampleModalLongTitle" style="font-size: 16px;font-weight: 600;align-items: center;">
				                                        Tagged Users</h5>
				                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
				                                          <span aria-hidden="true">&times;</span>
				                                        </button>
				                                      </div>
				                                      <div class="modal-body">
				                                        <ul class="explore__users">
				                                                    {% for user_follower in post.tagged_people.all %}
				                                                        
				                                                    <li class="explore__user">
				                                                        
				                                                        <div class="explore__user-column" style="text-overflow: ellipsis;white-space: nowrap;overflow: hidden;"> 
				                                                            <img src="{{user_follower.get_social_user.profile_photo.url}}" class="explore__avatar" height="45" width="30" style="border: 1px solid #555 !important;">
				                                                            <div class="explore__info" style="font-size: 80%">
				                                                                <a href="{{ user_follower.get_social_user.get_absolute_url }}" style="color:purple;display: block;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;">
				                                                                <span class="explore__username" style="">{{user_follower.username}} 
				                                                                    {% if user_follower.is_genuine %}
				                                                                        <img src="{% static 'images/verify_account.png' %}" height="20" width="20">
				                                                                    {% endif %}


				                                                              </span></a>

				                                                                <span class="explore__full-name" >{{user_follower.get_full_name}}</span>
				                                                            </div>
				                                                        </div>
				                                                        {% if user_follower != request.user %}
				                                                        <div class=" explore__user-column float-right">

				                                                         {% if user_follower.get_social_user.pk|check_follow_or_unfollow:request.user.get_social_user.pk  %}
				                                                                
				                                                            <button class='follow_unfollow_button' user_id='{{user_follower.get_social_user.pk}}' style="border: 2px solid;">Follow
				                                                            </button>   

				                                                        {% else %}                 
				                                                            <button class='follow_unfollow_button unfollow_button' user_id='{{user_follower.get_social_user.pk}}' style="border: 2px solid;">Unfollow
				                                                            </button>   

				                                                            {% endif %}

				                                                            
				                                                        </div>
				                                                        {% endif %}
				                                                    </li>
				                                           

				                                            {% endfor %}
				                                        </ul>

				                                      </div>
				                                    </div>
				                                  </div>
				                                </div>
				                        {% endif %}

				                    </div>
				                    <span class="photo__likes">45 likes</span>
				                    <ul class="photo__comments">
				                        <li class="photo__comment">
				                            <span class="photo__comment-author">serranoarevalo</span> love this!
				                        </li>
				                        <li class="photo__comment">
				                            <span class="photo__comment-author">serranoarevalo</span> love this!
				                        </li>
				                        <li class="photo__comment">
				                            <span class="photo__comment-author">serranoarevalo</span> love this!
				                        </li>
				                        <li class="photo__comment">
				                            <span class="photo__comment-author">serranoarevalo</span> love this!
				                        </li>
				                    </ul>
				                    <span class="photo__time-ago">2 hours ago</span>
				                    <div class="photo__add-comment-container">
				                        <textarea name="comment" placeholder="Add a comment..."></textarea>
				                             <i class="fas fa-location-arrow"></i>
				                    </div>
				                </div>
				            </div>
								`
				    	})
			    	}else{
			    		console.warn('posts are end now ')
			    	}
			    },
			    error :function(error) {
			    	console.log(error)
			    },


			});
		};
handle_get_data()

load_btn.addEventListener('click',()=>{
	visble +=3
	handle_get_data()
})



