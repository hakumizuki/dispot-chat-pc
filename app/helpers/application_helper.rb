module ApplicationHelper
  def torichan(toppu, moaco)
    @torichan = GroupUser.where('group_id = ? and user_id = ?', toppu, moaco)
    if @torichan[0].status == 2
      return "member"
    elsif @torichan[0].status == 1
      return "invited"
    else
      return false
    end
  end
end
