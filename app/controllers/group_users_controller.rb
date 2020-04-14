class GroupUsersController < ApplicationController
  before_action :set_groups
  before_action :set_user

  def index
    @inviteds = GroupUser.where('user_id = ? and status = ?', current_user.id, 1)
    @group_user = GroupUser.new
  end

  def update
    @group_user = GroupUser.find(params[:id])
    if @group_user.update(status_params)
      redirect_to user_group_users_path(current_user)
    else
      render :index
    end
  end

  private

  def set_user
    @user = current_user
  end

  def set_groups
    @groups = Group.all
  end

  def status_params
    params.permit(:group_id, :user_id, :status)
  end
end
