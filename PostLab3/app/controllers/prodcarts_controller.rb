class ProdcartsController < ApplicationController
  def index
    if !user_signed_in?
      redirect_to new_user_session_path , notice: 'No has iniciado sesión.'
    else
      x = Prodcart.where(username: current_user.username)
      contador = Prodcart.where(username: current_user.username).count()
    	@prods = x
      @contador = contador
    end
  end

  # POST /prodcarts/add
 
  def add
    if !user_signed_in?
      redirect_to new_user_session_path , notice: 'No has iniciado sesión.'
    else
      @prod_to_cart = Prodcart.new(:username => current_user.username, :id_prod => params[:id_prod], :cant_prod => 1)
      if @prod_to_cart.save
        respond_to do |format|
          format.html { redirect_to '/prodcarts/index', notice: 'Registro exitoso, puedes proceder a comprar.', :status => 200 }
          format.json { render json: { :error => 'false', :desc => 'Registro exitoso' } }
        end

      else
        respond_to do |format|
          format.html { redirect_to products_path, notice: @usuario.errors.full_messages.to_sentence }
          format.json { render json: { :error => 'true', :desc => @usuario.errors.full_messages} }
        end
      end
    end
  end

  def delete
    if !user_signed_in?
      redirect_to new_user_session_path , notice: 'No has iniciado sesión.'
    else
      @x = Prodcart.find_by(username: current_user.username, id_prod: params[:id_prod])
      @x.destroy
      respond_to do |format|
        format.html { redirect_to '/prodcarts/index', notice: 'Producto eliminado del carrito.' }
        format.json { head :no_content }
      end
    end
  end

  
  def edit
    if !user_signed_in?
      redirect_to new_user_session_path , notice: 'No has iniciado sesión.'
    else
      producto = Prodcart.find_by(username: current_user.username, id_prod: params[:id_prod])
      producto.cant_prod = params[:cant_prod]
      producto.save
      respond_to do |format|
        format.html { redirect_to '/prodcarts/index', notice: 'Producto editado del carrito.' }
        format.json { head :no_content }
      end
    end
  end
end
