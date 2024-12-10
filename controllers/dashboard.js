
export default {
    dashboardView: (req, res) => {
        res.render('dashboard', { name: req.params.name });
    }
}