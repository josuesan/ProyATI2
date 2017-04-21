class ProdcartsController < ApplicationController
  def index
    x = Prodcart.where(username: current_user.username)
    contador = Prodcart.where(username: current_user.username).count()
    #s = Prodcart.all
    print(x[0].username)
    print(contador)
    #print(s)
    #print(x[0].cant_prod)
  	@prods = x
    @contador = contador

  end

  # POST /prodcarts/add
 
  def add
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

  def delete
    @x = Prodcart.where(username: current_user.username, id_prod: params[:id_prod])
    @x.destroy
    respond_to do |format|
      format.html { redirect_to '/prodcarts/index', notice: 'Producto eliminado del carrito.' }
      format.json { head :no_content }
    end
  end
end
