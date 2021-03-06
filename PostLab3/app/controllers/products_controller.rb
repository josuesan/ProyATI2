class ProductsController < ApplicationController
  before_action :set_product, only: [:show, :edit, :update, :destroy]

  # GET /products
  # GET /products.json
  def index
    #@products = Product.all
    if (user_signed_in?)
      print (current_user.nombre)
      printf()
      print (current_user.id)
      usuario= User.find(1)
      print (usuario.username)
      print (usuario.nombre)
    end
  end
    

  # GET /products/1
  # GET /products/1.json
  def show
  end

  # GET /products/new
  def new
    if !user_signed_in?
        redirect_to '/' , alert: 'Acceso denegado.'
    else
      if current_user.username != 'admin'
        redirect_to '/' , alert: 'Acceso denegado.'
      end
    end
    #@product = Product.new
  end


  # GET /products/1/edit
  def edit
    if !user_signed_in?
        redirect_to '/' , alert: 'Acceso denegado.'
    else
      if current_user.username != 'admin'
        redirect_to '/' , alert: 'Acceso denegado.'
      end
    end
  end

  # POST /products
  # POST /products.json
  def create
    if !user_signed_in?
        redirect_to '/' , alert: 'Acceso denegado.'
    else
      if current_user.username != 'admin'
        redirect_to '/' , alert: 'Acceso denegado.'
      end
    end
    #@product = Product.new(product_params)

    #respond_to do |format|
      #if @product.save
        #format.html { redirect_to products, notice: 'Product was successfully created.' }
        #format.json { render :show, status: :created, location: @product }
      #else
        #format.html { render :new }
        #format.json { render json: @product.errors, status: :unprocessable_entity }
      #end
    #end
  end

  # PATCH/PUT /products/1
  # PATCH/PUT /products/1.json
  def update
    if !user_signed_in?
        redirect_to '/' , alert: 'Acceso denegado.'
    else
      if current_user.username != 'admin'
        redirect_to '/' , alert: 'Acceso denegado.'
      end
    end
    respond_to do |format|
      if @product.update(product_params)
        format.html { redirect_to @product, notice: 'Product was successfully updated.' }
        format.json { render :show, status: :ok, location: @product }
      else
        format.html { render :edit }
        format.json { render json: @product.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /products/1
  # DELETE /products/1.json
  def destroy
    if !user_signed_in?
        redirect_to '/' , alert: 'Acceso denegado.'
    else
      if current_user.username != 'admin'
        redirect_to '/' , alert: 'Acceso denegado.'
      end
    end
    @product.destroy
    respond_to do |format|
      format.html { redirect_to products_url, notice: 'Product was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_product
      #@product = Product.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def product_params
      params.require(:product).permit(:foto, :nombre, :descripcion, :categoria, :precio, :vendido)
    end
end
