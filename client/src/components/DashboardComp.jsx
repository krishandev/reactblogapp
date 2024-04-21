import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import { HiAnnotation, HiArrowNarrowUp, HiDocumentText, HiOutlineUserGroup } from 'react-icons/hi'
import { Button, Table } from 'flowbite-react'
import {Link} from 'react-router-dom'


const DashboardComp = () => {
    const [users, setUsers]=useState([])
    const [comments, setComments]=useState([])
    const [posts, setPosts]=useState([])
    const [totalUsers, setTotalUsers]=useState(0)
    const [totalPosts, setTotalPosts]=useState(0)
    const [totalComments, setTotalComments]=useState(0)
    const [lastMonthUsers, setLastMonthUsers]=useState(0)
    const [lastMonthPosts, setLastMonthPosts]=useState(0)
    const [lastMonthComments, setLastMonthComments]=useState(0)
    const {currentUser} =useSelector((state)=>state.user)

    useEffect(()=>{
        const fetchUsers=async()=>{
            try {
                const res=await fetch('/api/user/getusers?limit=5');
                const data=await res.json();
                if(res.ok){
                    setUsers(data.users);
                    setTotalUsers(data.totalUsers);
                    setLastMonthUsers(data.lastMonthUsers)
                }
                
            } catch (error) {
                console.log(error.message)
            }
        }

        const fetchPosts=async()=>{
            try {
                const res=await fetch('/api/post/getposts?limit=5');
                const data=await res.json();
                if(res.ok){
                 setPosts(data.posts);
                 setTotalPosts(data.totalPosts);
                 setLastMonthPosts(data.lastMonthPosts);
                }
            } catch (error) {
                console.log(error.message)
            }
        }
        const fetchComments=async()=>{
            try {
                const res=await fetch('/api/comment/getcomments?limit=5');
                const data=await res.json();
                if(res.ok){
                    setComments(data.comments);
                    setTotalComments(data.totalComments);
                    setLastMonthComments(data.lastMonthComments);
                }
            } catch (error) {
                console.log(error.message)
            }
        }
        if(currentUser.isAdmin){
            fetchUsers();
            fetchPosts();
            fetchComments();
        }
    }, [currentUser])
    

  return (
    <div className='p-3 md:mx-auto'>
    <div className='flex-wrap flex gap-4 justify-center'>
        {/* Users */}
        <div className=' flex flex-col p-3 w-full md:w-72 rounded-md shadow-md'>
            <div className='flex justify-between'>
                <div>
                    <h3 className=' text-xl uppercase '>Total Users</h3>
                    <p className=' text-xl'>{totalUsers}</p>
                </div>
                <HiOutlineUserGroup className='text-5xl bg-teal-500 text-white rounded-full p-3 shadow-md'/> 
            </div>
            <div className='flex gap-2 text-sm mt-5'>
                <span className='flex text-green-500 items-center'>
            <HiArrowNarrowUp/>
            {lastMonthUsers}
            </span>
            <div>Last Month</div>

            </div>
        </div>

        {/* Comments */}
        <div className=' w-full md:w-72 rounded-md shadow-md p-3'>
            <div className='flex justify-between '>
                <div>
                    <h3 className='text-xl uppercase'>Total Comments</h3>
                    <p className='text-xl'>{totalComments}</p>
                </div>
                <HiAnnotation className='text-5xl bg-teal-500 text-white rounded-full shadow-md p-3'/>
            </div>
            <div className='flex gap-3 mt-5 text-sm'>
                <span className='flex text-green-500 items-center'>
            <HiArrowNarrowUp/>
            {lastMonthComments}
            </span>
            <div>Last Month</div>

            </div>
        </div>

        {/* Posts */}
        <div className='p-3  w-full md:w-72 rounded-md shadow-md'>
            <div className='flex justify-between '>
                <div>
                    <h3 className='text-xl uppercase'>Total Posts</h3>
                    <p className=' text-xl'>{totalPosts}</p>
                </div>
                <HiDocumentText className=' text-5xl bg-teal-500 text-white rounded-full p-3'/>
            </div>
            <div className='flex gap-3 mt-5 text-sm'>
                <span className='flex text-green-500 items-center'>
            <HiArrowNarrowUp/>
            {lastMonthPosts}
            </span>
            <div>Last Month</div>

            </div>
        </div>
    </div>

    <div className='flex flex-wrap gap-4 mx-auto justify-center'>
        {/* Recent Users */}
    <div className='mt-5 border w-full md:w-80 p-3 rounded-md'>
        <div className='flex justify-between items-center'>
            <h3>Recent Users</h3>
            <Button gradientDuoTone='purpleToPink' outline>
                <Link to={'/dashboard?tab=users'}>See All</Link>
            </Button>
        </div>
        <Table className='mt-3'>
            <Table.Head>
                <Table.HeadCell>User Image</Table.HeadCell>
                <Table.HeadCell>Username</Table.HeadCell>
            </Table.Head>
            {
                users && users.map((user)=>(
                    <Table.Body key={user._id}>
                    <Table.Row>
                        <Table.Cell>
                            <img src={user.profilePicture}/>
                        </Table.Cell>
                        <Table.Cell>
                            {user.username}
                        </Table.Cell>
                    </Table.Row>
                    </Table.Body>
                ))
            }
        </Table>
    </div>

    {/* Recent Comments */}
    <div className='mt-5 border w-full md:w-80 p-3 rounded-md'>
        <div className='flex justify-between items-center'>
            <h3>Recent Comments</h3>
            <Button gradientDuoTone='purpleToPink' outline>
                <Link to={'/dashboard?tab=comments'}>See All</Link>
            </Button>
        </div>
        <Table className='mt-3'>
            <Table.Head>
                <Table.HeadCell>Comment Content</Table.HeadCell>
                <Table.HeadCell>Likes</Table.HeadCell>
            </Table.Head>
            {
                comments && comments.map((comment)=>(
                    <Table.Body key={comment._id}>
                    <Table.Row>
                        <Table.Cell>
                            <p>{comment.content}</p>
                        </Table.Cell>
                        <Table.Cell>
                            {comment.numberOfLikes}
                        </Table.Cell>
                    </Table.Row>
                    </Table.Body>
                ))
            }
        </Table>
    </div>

    {/* Recent Posts */}
    <div className='mt-5 border w-full md:w-80 p-3 rounded-md'>
        <div className='flex justify-between items-center'>
            <h3>Recent Posts</h3>
            <Button gradientDuoTone='purpleToPink' outline>
            <Link to={'/dashboard?tab=posts'}>See All</Link>
            </Button>
        </div>
        <Table className='mt-3'>
            <Table.Head>
                <Table.HeadCell>Post Image</Table.HeadCell>
                <Table.HeadCell>Post Title</Table.HeadCell>
                <Table.HeadCell>Category</Table.HeadCell>
            </Table.Head>
            {
                posts && posts.map((post)=>(
                    <Table.Body key={post._id}>
                    <Table.Row>
                        <Table.Cell>
                            <img className='w-14' src={post.image}/>
                        </Table.Cell>
                        <Table.Cell className='w-96'>
                            {post.title}
                        </Table.Cell>
                        <Table.Cell className='w-5'>{post.category}</Table.Cell>
                    </Table.Row>
                    </Table.Body>
                ))
            }
        </Table>
    </div>
    </div>
    </div>
  )
}

export default DashboardComp