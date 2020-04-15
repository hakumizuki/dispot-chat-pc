class GroupsController < ApplicationController
  before_action :accepted_user

  def index
    # group_users = GroupUser.where('user_id = ?', current_user.id)
    # @accepted_user = group_users.where('status = ?', 2)
  end

  def new
    @group = Group.new
    @group.users << current_user
  end

  def create
    @group = Group.new(group_params)
    if @group.save
      redirect_to root_path, notice: 'グループを作成しました'
    else
      render :new
    end
  end

  def edit
    @group = Group.find(params[:id])
  end

  def update
    @group = Group.find(params[:id])
    if @group.update(group_params)
      redirect_to group_messages_path(@group), notice: 'グループを更新しました'
    else
      render :edit
    end
  end

  private

  def accepted_user
    group_users = GroupUser.where('user_id = ?', current_user.id)
    @accepted_user = group_users.where('status = ?', 2)
  end

  def group_params
    params.require(:group).permit(:name, :image, user_ids: [])
  end
  
end
