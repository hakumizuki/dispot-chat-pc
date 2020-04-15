class NotesController < ApplicationController
  before_action :set_group
  before_action :accepted_user

  def index
    @notes = @group.notes
  end

  def new
    @note = Note.new
  end

  def create
    @note = @group.notes.new(note_params)
    if @note.save
      redirect_to group_notes_path(@group)
    else
      render :new
    end
  end

  def edit
    @note = Note.find(params[:id])
  end

  def update
    @note = Note.find(params[:id])
    if @group.notes.update(note_params)
      redirect_to group_notes_path(@group)
    else
      render :edit
    end
  end

  private

  def set_group
    @group = Group.find(params[:group_id])
  end

  def note_params
    params.require(:note).permit(:title, :content, :image, :url)
  end

  def accepted_user
    group_users = GroupUser.where('user_id = ?', current_user.id)
    @accepted_user = group_users.where('status = ?', 2)
  end
end
