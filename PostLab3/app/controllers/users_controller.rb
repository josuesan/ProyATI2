class UsersController < ApplicationController
  before_action :set_product, only: [:show, :edit, :update, :destroy]

  # POST /users/registroapi
  # POST /users.json
  def registroapi
    @usuario = User.new(:email => params[:email], :password => params[:password], :password_confirmation => params[:password],  :nombre => params[:nombre], :username => params[:username], :nacimiento => params[:nacimiento], :genero => params[:genero])
    if @usuario.save
      respond_to do |format|
        format.html { redirect_to '/users/sign_in', notice: 'Registro exitoso, puedes iniciar sesión.', :status => 200 }
        format.json { render json: { :error => 'false', :desc => 'Registro exitoso' } }
      end

    else
      respond_to do |format|
        format.html { redirect_to '/registro_api', notice: @usuario.errors.full_messages.to_sentence }
        format.json { render json: { :error => 'true', :desc => @usuario.errors.full_messages} }
      end
    end
  end
    #@products = Product.all
end
