class ApplicationController < ActionController::API
    def index
    calorie_entries=CaloryEntry.all
    render json: api_v1_calorie_entries_path
    end
    def create
    calorie=CalorieEntry.creat(calorie_entries_params)
    render json: api_v1_calorie_entry_path(calorie)
    end





    private 
    def calorie_entries_params
        params.require(:api_v1_calorie_entries).permit(:calorie, :note)
    end
end
