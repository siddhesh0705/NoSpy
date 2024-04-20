
const Team = require('../model/team'); 
const user = require('../model/User'); 
const Image = require('../model/image'); 
const Task = require('../model/task'); 
const User = require('../model/User');


const create_team = async (req, res) => {
    const { name, members_id_list, logo_id, leader_id, task_id_list } = req.body;

    try {
        if (!name || !members_id_list || !logo_id || !leader_id) {
            return res.status(400).json({ success: false, message: 'Please fill all the fields' });
        }

        // const allMembersExist = await user.find({ _id: { $in: members_id_list } }).countDocuments() === members_id_list.length;
        // if (!allMembersExist) {
        //     return res.status(400).json({ success: false, message: 'One or more member IDs do not exist' });
        // }

        // const leaderExists = await user.exists({ _id: leader_id });
        // if (!leaderExists) {
        //     return res.status(400).json({ success: false, message: 'Leader ID does not exist' });
        // }

        // const logoExists = await Image.exists({ _id: logo_id });
        // if (!logoExists) {
        //     return res.status(400).json({ success: false, message: 'Logo ID does not exist' });
        // }

        // const allTasksExist = await Task.find({ _id: { $in: task_id_list } }).countDocuments() === task_id_list.length;
        // if (!allTasksExist) {
        //     return res.status(400).json({ success: false, message: 'One or more task IDs do not exist' });
        // }

        const newTeam = new Team({
            name,
            members_id_list,
            logo_id,
            leader_id,
            task_id_list
        });

        const savedTeam = await newTeam.save();
        

        res.status(201).json({ success: true, message: 'Team created successfully', team: savedTeam });

    } catch (error) {
        console.error('Error creating team:', error);
        res.status(500).json({ success: false, message: 'Failed to create team', error: error.message });
    }
};

const add_member = async (req,res)=>{
    const {member_id,team_id} = req.body;

    try {
        if(!member_id || !team_id){
            return res.status(401).json({sucess:false,message:'plzz fill all fields'});
        }
        else{
            const team = await Team.findById(team_id);
            if(!team){
                return res.status(404).json({success:false,message:'team not found'});
            }

            team.members_id_list.push(member_id);

            const user_id = await user.findById(member_id);

            user.team_id_list.push(team_id);
            const updateTeam = await team.save();
            const updateUser = await user_id.save();

            return res.status(200).json({success:true,message:'member added successfully ',team:updateTeam , user:updateUser});
        }
    } catch (error) {
        console.error('error adding member to team',error);
        return res.status(500).json({success:false,message:'failed to add team member',error:error.message});
    }
}
const assign_task = async (req,res)=>{
    const {title , discription , task_assigned_to , team_id , deadline , task_status} = req.body;

    try {
        if(!title || !discription || !task_assigned_to || !team_id || !deadline || !task_status){
            return res.status(401).json({success:false,message:'plzz fill all the fields'});
        }
        else{
            const newTask = new Task({
                title,
                discription,
                task_assigned_to,
                team_id,
                deadline,
                task_status
            })
            const savedTask = await newTask.save();
            const team = await Team.findById(team_id);

            team.task_id_list.push(savedTask._id);
            
            return res.status(200).json({success:true,message:'the task has been assigned successfully',task:savedTask});
        }
    } catch (error) {
        console.error('error assigning task',error);
        return res.statuss(500).json({success:false,message:'failed to assign task',error:error.message});
    }
}

const get_team = async (req, res) => {
    const { team_id } = req.body; 
    const userIdObjectId = mongoose.Types.ObjectId(team_id);
    try {
        if (!userIdObjectId) {
            return res.status(401).json({ success: false, message: "Please enter the team_id" });
        } else {
            const team = await Team.findById(userIdObjectId);
            if (team) {
                return res.status(200).json({ success: true, message: "Team has been fetched successfully", team: team });
            } else {
                return res.status(404).json({ success: false, message: "Team not found" });
            }
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error occurred while fetching team", error: error.message });
    }
}

const get_user = async (req,res)=>{
    const user_id = req.body;
    const userIdObjectId = mongoose.Types.ObjectId(user_id);

    try {
        if(!userIdObjectId){
            return res.status(400).json({success:false,message:"plzz give the required field"});
        }
        else{
           const user = await User.findById(userIdObjectId);

           if(user){
            return res.status(200).json({success:true,message:"user found successfully",user:user});
           }
           else{
            return res.status(404).json({success:false,message:"user not found"});
           }

            
        }
    } catch (error) {
        return res.status(500).json({success:false,message:"internal server error",error:error.message});
    }
}


module.exports = {create_team ,add_member, assign_task , get_team , get_user};
